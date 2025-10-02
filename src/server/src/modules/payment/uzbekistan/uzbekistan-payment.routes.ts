import express from "express";
import clickPaymentService from "./click.service";
import paymePaymentService from "./payme.service";
import protect from "@/shared/middlewares/protect";

const router = express.Router();

/**
 * @swagger
 * /click/create-payment:
 *   post:
 *     summary: Create Click payment
 *     description: Creates a payment URL for Click payment system
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Payment amount in UZS
 *               orderId:
 *                 type: string
 *                 description: Order ID
 *               returnUrl:
 *                 type: string
 *                 description: Return URL after payment
 *               description:
 *                 type: string
 *                 description: Payment description
 *     responses:
 *       200:
 *         description: Payment URL created successfully
 *       400:
 *         description: Invalid request data
 */
router.post("/click/create-payment", protect, async (req, res) => {
  try {
    const { amount, orderId, returnUrl, description } = req.body;

    if (!amount || !orderId || !returnUrl) {
      return res.status(400).json({
        success: false,
        message: "Amount, orderId va returnUrl majburiy"
      });
    }

    const result = await clickPaymentService.createPayment({
      amount,
      orderId,
      returnUrl,
      description: description || "Inbola - Bolalar mahsulotlari uchun to'lov"
    });

    if (result.success) {
      res.json({
        success: true,
        message: "To'lov URL yaratildi",
        data: {
          paymentUrl: result.paymentUrl,
          transactionId: result.transactionId
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server xatosi",
      error: error.message
    });
  }
});

/**
 * @swagger
 * /click/check-status/{transactionId}:
 *   get:
 *     summary: Check Click payment status
 *     description: Checks the status of a Click payment transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID to check
 *     responses:
 *       200:
 *         description: Payment status retrieved successfully
 *       404:
 *         description: Transaction not found
 */
router.get("/click/check-status/:transactionId", protect, async (req, res) => {
  try {
    const { transactionId } = req.params;

    const status = await clickPaymentService.checkPaymentStatus(transactionId);

    res.json({
      success: true,
      message: "To'lov holati olindi",
      data: status
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server xatosi",
      error: error.message
    });
  }
});

/**
 * @swagger
 * /payme/create-payment:
 *   post:
 *     summary: Create Payme payment
 *     description: Creates a payment URL for Payme payment system
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Payment amount in UZS
 *               orderId:
 *                 type: string
 *                 description: Order ID
 *               returnUrl:
 *                 type: string
 *                 description: Return URL after payment
 *               description:
 *                 type: string
 *                 description: Payment description
 *     responses:
 *       200:
 *         description: Payment URL created successfully
 *       400:
 *         description: Invalid request data
 */
router.post("/payme/create-payment", protect, async (req, res) => {
  try {
    const { amount, orderId, returnUrl, description } = req.body;

    if (!amount || !orderId || !returnUrl) {
      return res.status(400).json({
        success: false,
        message: "Amount, orderId va returnUrl majburiy"
      });
    }

    const result = await paymePaymentService.createPayment({
      amount,
      orderId,
      returnUrl,
      description: description || "Inbola - Bolalar mahsulotlari uchun to'lov"
    });

    if (result.success) {
      res.json({
        success: true,
        message: "To'lov URL yaratildi",
        data: {
          paymentUrl: result.paymentUrl,
          transactionId: result.transactionId
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server xatosi",
      error: error.message
    });
  }
});

/**
 * @swagger
 * /payme/webhook:
 *   post:
 *     summary: Payme webhook handler
 *     description: Handles webhook notifications from Payme payment system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 */
router.post("/payme/webhook", async (req, res) => {
  try {
    const { method, params } = req.body;

    // Payme JSON-RPC so'rovlarini qayta ishlash
    switch (method) {
      case 'CheckPerformTransaction':
        // Buyurtma mavjudligini tekshirish
        const orderId = params.account.order_id;
        // Bu yerda buyurtma mavjudligini tekshirish logikasi bo'lishi kerak
        
        res.json({
          jsonrpc: '2.0',
          result: {
            allow: true
          },
          id: req.body.id
        });
        break;

      case 'CreateTransaction':
        // Tranzaksiya yaratish
        res.json({
          jsonrpc: '2.0',
          result: {
            transaction: params.id,
            state: 1,
            create_time: Date.now()
          },
          id: req.body.id
        });
        break;

      case 'PerformTransaction':
        // Tranzaksiyani bajarish
        res.json({
          jsonrpc: '2.0',
          result: {
            transaction: params.id,
            state: 2,
            perform_time: Date.now()
          },
          id: req.body.id
        });
        break;

      case 'CancelTransaction':
        // Tranzaksiyani bekor qilish
        res.json({
          jsonrpc: '2.0',
          result: {
            transaction: params.id,
            state: -1,
            cancel_time: Date.now()
          },
          id: req.body.id
        });
        break;

      case 'CheckTransaction':
        // Tranzaksiya holatini tekshirish
        res.json({
          jsonrpc: '2.0',
          result: {
            transaction: params.id,
            state: 2,
            create_time: Date.now(),
            perform_time: Date.now()
          },
          id: req.body.id
        });
        break;

      default:
        res.status(400).json({
          jsonrpc: '2.0',
          error: {
            code: -32601,
            message: 'Method not found'
          },
          id: req.body.id
        });
    }
  } catch (error: any) {
    res.status(500).json({
      jsonrpc: '2.0',
      error: {
        code: -32603,
        message: 'Internal error'
      },
      id: req.body.id
    });
  }
});

/**
 * @swagger
 * /click/webhook:
 *   post:
 *     summary: Click webhook handler
 *     description: Handles webhook notifications from Click payment system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 */
router.post("/click/webhook", async (req, res) => {
  try {
    const payload = req.body;
    const signature = req.headers['x-click-signature'] as string;

    // Imzoni tekshirish
    const isValidSignature = clickPaymentService.verifyWebhookSignature(payload, signature);
    
    if (!isValidSignature) {
      return res.status(401).json({
        success: false,
        message: "Invalid signature"
      });
    }

    // To'lov holatini qayta ishlash
    const { transaction_id, status, amount } = payload;
    
    // Bu yerda buyurtma holatini yangilash logikasi bo'lishi kerak
    console.log(`Click webhook: Transaction ${transaction_id}, Status: ${status}, Amount: ${amount}`);

    res.json({
      success: true,
      message: "Webhook processed"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server xatosi",
      error: error.message
    });
  }
});

export default router;
