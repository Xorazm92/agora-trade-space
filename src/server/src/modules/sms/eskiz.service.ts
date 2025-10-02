import axios from 'axios';
import Redis from 'ioredis';

export interface SMSRequest {
  phone: string;
  message: string;
}

export interface OTPRequest {
  phone: string;
  code?: string; // Agar berilmasa, avtomatik yaratiladi
}

export interface SMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class EskizSMSService {
  private email: string;
  private password: string;
  private baseUrl: string;
  private token: string | null = null;
  private redis: Redis;

  constructor() {
    this.email = process.env.ESKIZ_EMAIL || '';
    this.password = process.env.ESKIZ_PASSWORD || '';
    this.baseUrl = process.env.ESKIZ_BASE_URL || 'https://notify.eskiz.uz/api';
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD
    });
  }

  /**
   * Eskiz SMS ga login qilish va token olish
   */
  async authenticate(): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/login`, {
        email: this.email,
        password: this.password
      });

      if (response.data.message === 'token_generated') {
        this.token = response.data.data.token;
        // Token ni Redis da saqlash (24 soat)
        if (this.token) {
          await this.redis.setex('eskiz_token', 86400, this.token);
        }
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Eskiz SMS authentication error:', error.message);
      return false;
    }
  }

  /**
   * Token olish (Redis dan yoki yangi)
   */
  async getToken(): Promise<string | null> {
    // Avval Redis dan tekshirish
    const token = await this.redis.get('eskiz_token');
    
    if (token && typeof token === 'string') {
      return token;
    }

    // Agar token yo'q bo'lsa, yangi olish
    const authenticated = await this.authenticate();
    return authenticated ? this.token : null;
  }

  /**
   * SMS yuborish
   */
  async sendSMS(request: SMSRequest): Promise<SMSResponse> {
    try {
      const token = await this.getToken();
      if (!token) {
        return {
          success: false,
          error: 'SMS xizmatiga ulanishda xatolik'
        };
      }

      // Telefon raqamini formatlash (+998 prefiksi bilan)
      const formattedPhone = this.formatPhoneNumber(request.phone);

      const response = await axios.post(
        `${this.baseUrl}/message/sms/send`,
        {
          mobile_phone: formattedPhone,
          message: request.message,
          from: '4546' // Eskiz SMS dan berilgan sender ID
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.message === 'Waiting for SMS') {
        return {
          success: true,
          messageId: response.data.data.id
        };
      } else {
        return {
          success: false,
          error: response.data.message || 'SMS yuborishda xatolik'
        };
      }
    } catch (error: any) {
      // Token muddati tugagan bo'lsa, yangi token olish
      if (error.response?.status === 401) {
        await this.redis.del('eskiz_token');
        this.token = null;
        // Bir marta qayta urinish
        return await this.sendSMS(request);
      }

      return {
        success: false,
        error: error.message || 'SMS yuborishda xatolik'
      };
    }
  }

  /**
   * OTP kod yaratish va yuborish
   */
  async sendOTP(request: OTPRequest): Promise<SMSResponse & { code?: string }> {
    try {
      // OTP kod yaratish (agar berilmagan bo'lsa)
      const otpCode = request.code || this.generateOTPCode();
      
      // OTP ni Redis da saqlash (5 daqiqa)
      const otpKey = `otp:${request.phone}`;
      await this.redis.setex(otpKey, 300, otpCode);

      // SMS yuborish
      const smsRequest: SMSRequest = {
        phone: request.phone,
        message: `Inbola: Tasdiqlash kodi: ${otpCode}. Kodni hech kimga bermang!`
      };

      const result = await this.sendSMS(smsRequest);
      
      if (result.success) {
        return {
          ...result,
          code: otpCode // Faqat development muhitida qaytarish
        };
      }

      return result;
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'OTP yuborishda xatolik'
      };
    }
  }

  /**
   * OTP kodni tekshirish
   */
  async verifyOTP(phone: string, code: string): Promise<boolean> {
    try {
      const otpKey = `otp:${phone}`;
      const storedCode = await this.redis.get(otpKey);
      
      if (storedCode === code) {
        // Tasdiqlangandan keyin OTP ni o'chirish
        await this.redis.del(otpKey);
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('OTP verification error:', error.message);
      return false;
    }
  }

  /**
   * OTP kod yaratish
   */
  private generateOTPCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Telefon raqamini formatlash
   */
  private formatPhoneNumber(phone: string): string {
    // Barcha bo'sh joylar va maxsus belgilarni olib tashlash
    let cleaned = phone.replace(/\D/g, '');
    
    // Agar +998 bilan boshlanmasa, qo'shish
    if (!cleaned.startsWith('998')) {
      if (cleaned.startsWith('8')) {
        cleaned = '99' + cleaned;
      } else if (cleaned.length === 9) {
        cleaned = '998' + cleaned;
      }
    }
    
    return cleaned;
  }

  /**
   * SMS holatini tekshirish
   */
  async checkSMSStatus(messageId: string): Promise<any> {
    try {
      const token = await this.getToken();
      if (!token) {
        throw new Error('Token olishda xatolik');
      }

      const response = await axios.get(
        `${this.baseUrl}/message/sms/status/${messageId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(`SMS holatini tekshirishda xatolik: ${error.message}`);
    }
  }

  /**
   * Balansni tekshirish
   */
  async checkBalance(): Promise<any> {
    try {
      const token = await this.getToken();
      if (!token) {
        throw new Error('Token olishda xatolik');
      }

      const response = await axios.get(`${this.baseUrl}/user/get-limit`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`Balansni tekshirishda xatolik: ${error.message}`);
    }
  }
}

export default new EskizSMSService();
