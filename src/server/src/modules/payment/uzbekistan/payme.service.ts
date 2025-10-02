import crypto from 'crypto';
import axios from 'axios';

export interface PaymePaymentRequest {
  amount: number; // tiyin hisobida (1 so'm = 100 tiyin)
  orderId: string;
  returnUrl: string;
  description?: string;
}

export interface PaymePaymentResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  error?: string;
}

export class PaymePaymentService {
  private merchantId: string;
  private secretKey: string;
  private baseUrl: string;

  constructor() {
    this.merchantId = process.env.PAYME_MERCHANT_ID || '';
    this.secretKey = process.env.PAYME_SECRET_KEY || '';
    this.baseUrl = process.env.PAYME_BASE_URL || 'https://checkout.paycom.uz';
  }

  /**
   * Payme to'lov URL yaratish
   */
  async createPayment(request: PaymePaymentRequest): Promise<PaymePaymentResponse> {
    try {
      // Payme uchun amount tiyin hisobida bo'lishi kerak
      const amountInTiyin = request.amount * 100;
      
      const params = {
        m: this.merchantId,
        ac: {
          order_id: request.orderId
        },
        a: amountInTiyin,
        c: request.returnUrl,
        l: 'uz' // til
      };

      // Base64 encode qilish
      const encodedParams = Buffer.from(JSON.stringify(params)).toString('base64');
      const paymentUrl = `${this.baseUrl}/${encodedParams}`;

      return {
        success: true,
        paymentUrl,
        transactionId: request.orderId
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Payme to\'lov yaratishda xatolik'
      };
    }
  }

  /**
   * Payme JSON-RPC so'rov yuborish
   */
  async sendJsonRpcRequest(method: string, params: any): Promise<any> {
    try {
      const auth = Buffer.from(`Paycom:${this.secretKey}`).toString('base64');
      
      const payload = {
        jsonrpc: '2.0',
        method,
        params,
        id: Date.now()
      };

      const response = await axios.post(`${this.baseUrl}/api`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
          'Cache-Control': 'no-cache'
        }
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`Payme API xatosi: ${error.message}`);
    }
  }

  /**
   * Tranzaksiya yaratish
   */
  async createTransaction(orderId: string, amount: number): Promise<any> {
    const params = {
      account: {
        order_id: orderId
      },
      amount: amount * 100, // tiyin hisobida
      time: Date.now()
    };

    return await this.sendJsonRpcRequest('CreateTransaction', params);
  }

  /**
   * Tranzaksiya holatini tekshirish
   */
  async checkTransaction(transactionId: string): Promise<any> {
    const params = {
      id: transactionId
    };

    return await this.sendJsonRpcRequest('CheckTransaction', params);
  }

  /**
   * Tranzaksiyani tasdiqlash
   */
  async performTransaction(transactionId: string): Promise<any> {
    const params = {
      id: transactionId
    };

    return await this.sendJsonRpcRequest('PerformTransaction', params);
  }

  /**
   * Tranzaksiyani bekor qilish
   */
  async cancelTransaction(transactionId: string, reason: number): Promise<any> {
    const params = {
      id: transactionId,
      reason
    };

    return await this.sendJsonRpcRequest('CancelTransaction', params);
  }

  /**
   * Buyurtma holatini tekshirish
   */
  async checkPerformTransaction(orderId: string): Promise<any> {
    const params = {
      account: {
        order_id: orderId
      }
    };

    return await this.sendJsonRpcRequest('CheckPerformTransaction', params);
  }

  /**
   * Webhook imzosini tekshirish
   */
  verifyWebhookSignature(payload: string, receivedSignature: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha1', this.secretKey)
      .update(payload)
      .digest('hex');
    
    return expectedSignature === receivedSignature;
  }

  /**
   * Xatolik kodlari
   */
  static readonly ERROR_CODES = {
    INVALID_AMOUNT: -31001,
    INVALID_ACCOUNT: -31050,
    ORDER_NOT_FOUND: -31051,
    ORDER_ALREADY_PAID: -31052,
    ORDER_CANCELLED: -31053,
    TRANSACTION_NOT_FOUND: -31003,
    UNABLE_TO_PERFORM: -31008
  };
}

export default new PaymePaymentService();
