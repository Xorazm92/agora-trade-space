import crypto from 'crypto';
import axios from 'axios';

export interface ClickPaymentRequest {
  amount: number;
  orderId: string;
  returnUrl: string;
  description?: string;
}

export interface ClickPaymentResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  error?: string;
}

export class ClickPaymentService {
  private merchantId: string;
  private secretKey: string;
  private baseUrl: string;

  constructor() {
    this.merchantId = process.env.CLICK_MERCHANT_ID || '';
    this.secretKey = process.env.CLICK_SECRET_KEY || '';
    this.baseUrl = process.env.CLICK_BASE_URL || 'https://api.click.uz/v2';
  }

  /**
   * To'lov uchun URL yaratish
   */
  async createPayment(request: ClickPaymentRequest): Promise<ClickPaymentResponse> {
    try {
      const timestamp = Date.now().toString();
      const signature = this.generateSignature(request, timestamp);

      const payload = {
        merchant_id: this.merchantId,
        amount: request.amount,
        transaction_param: request.orderId,
        return_url: request.returnUrl,
        description: request.description || 'Inbola - Bolalar mahsulotlari uchun to\'lov',
        timestamp,
        signature
      };

      const response = await axios.post(`${this.baseUrl}/payments`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data.success) {
        return {
          success: true,
          paymentUrl: response.data.payment_url,
          transactionId: response.data.transaction_id
        };
      } else {
        return {
          success: false,
          error: response.data.error || 'To\'lov yaratishda xatolik'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Click to\'lov xizmati bilan bog\'lanishda xatolik'
      };
    }
  }

  /**
   * To'lov holatini tekshirish
   */
  async checkPaymentStatus(transactionId: string): Promise<any> {
    try {
      const timestamp = Date.now().toString();
      const signature = this.generateStatusSignature(transactionId, timestamp);

      const response = await axios.get(`${this.baseUrl}/payments/${transactionId}`, {
        headers: {
          'merchant-id': this.merchantId,
          'timestamp': timestamp,
          'signature': signature
        }
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`To'lov holatini tekshirishda xatolik: ${error.message}`);
    }
  }

  /**
   * Webhook uchun imzo tekshirish
   */
  verifyWebhookSignature(payload: any, receivedSignature: string): boolean {
    const expectedSignature = this.generateWebhookSignature(payload);
    return expectedSignature === receivedSignature;
  }

  /**
   * To'lov uchun imzo yaratish
   */
  private generateSignature(request: ClickPaymentRequest, timestamp: string): string {
    const data = `${this.merchantId}${request.amount}${request.orderId}${timestamp}${this.secretKey}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Status tekshirish uchun imzo
   */
  private generateStatusSignature(transactionId: string, timestamp: string): string {
    const data = `${this.merchantId}${transactionId}${timestamp}${this.secretKey}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Webhook uchun imzo
   */
  private generateWebhookSignature(payload: any): string {
    const data = `${payload.merchant_id}${payload.transaction_id}${payload.amount}${payload.status}${this.secretKey}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}

export default new ClickPaymentService();
