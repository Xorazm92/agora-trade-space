import express from "express";
import { makeAuthController } from "./auth.factory";
import passport from "passport";
import { cookieOptions } from "@/shared/constants";
import { CartService } from "../cart/cart.service";
import { CartRepository } from "../cart/cart.repository";
import handleSocialLogin from "@/shared/utils/auth/handleSocialLogin";
import eskizSMSService from "../sms/eskiz.service";

const router = express.Router();
const authController = makeAuthController();
const cartService = new CartService(new CartRepository());
const CLIENT_URL_DEV = process.env.CLIENT_URL_DEV;
const CLIENT_URL_PROD = process.env.CLIENT_URL_PROD;
const env = process.env.NODE_ENV;

/**
 * @swagger
 * /google:
 *   get:
 *     summary: Redirect to Google for authentication
 *     description: Initiates the OAuth flow for Google login.
 *     responses:
 *       302:
 *         description: Redirect to Google login page.
 */
router.get("/google", handleSocialLogin("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: env === "production" ? CLIENT_URL_PROD : CLIENT_URL_DEV,
  }),
  async (req: any, res: any) => {
    const user = req.user;
    const { accessToken, refreshToken } = user;

    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.cookie("accessToken", accessToken, cookieOptions);

    const userId = user.id;
    const sessionId = req.session.id;
    await cartService?.mergeCartsOnLogin(sessionId, userId);

    res.redirect(env === "production" ? CLIENT_URL_PROD : CLIENT_URL_DEV);
  }
);
/**
 * @swagger
 * /google/callback:
 *   get:
 *     summary: Handle callback from Google OAuth
 *     description: Handles the response from Google after OAuth authentication is complete.
 *     responses:
 *       200:
 *         description: Successfully authenticated with Google.
 */

/**
 * @swagger
 * /facebook:
 *   get:
 *     summary: Redirect to Facebook for authentication
 *     description: Initiates the OAuth flow for Facebook login.
 *     responses:
 *       302:
 *         description: Redirect to Facebook login page.
 */
router.get("/facebook", handleSocialLogin("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: env === "production" ? CLIENT_URL_PROD : CLIENT_URL_DEV,
  }),
  async (req: any, res: any) => {
    const user = req.user;
    const { accessToken, refreshToken } = user;

    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.cookie("accessToken", accessToken, cookieOptions);

    const userId = user.id;
    const sessionId = req.session.id;
    await cartService?.mergeCartsOnLogin(sessionId, userId);

    res.redirect(env === "production" ? CLIENT_URL_PROD : CLIENT_URL_DEV);
  }
);
/**
 * @swagger
 * /facebook/callback:
 *   get:
 *     summary: Handle callback from Facebook OAuth
 *     description: Handles the response from Facebook after OAuth authentication is complete.
 *     responses:
 *       200:
 *         description: Successfully authenticated with Facebook.
 */

/**
 * @swagger
 * /twitter:
 *   get:
 *     summary: Redirect to Twitter for authentication
 *     description: Initiates the OAuth flow for Twitter login.
 *     responses:
 *       302:
 *         description: Redirect to Twitter login page.
 */
router.get(
  "/twitter",
  passport.authenticate("twitter", {
    session: false,
    scope: ["email"],
  })
);
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    session: false,
    failureRedirect: `${
      env === "production" ? CLIENT_URL_PROD : CLIENT_URL_DEV
    }?error=auth_failed`,
  }),
  async (req: any, res: any) => {
    const user = req.user;
    const { accessToken, refreshToken } = user;

    console.log("Twitter callback user:", user);

    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.cookie("accessToken", accessToken, cookieOptions);

    const userId = user.id;
    const sessionId = req.session.id;
    await cartService?.mergeCartsOnLogin(sessionId, userId);

    res.redirect(env === "production" ? CLIENT_URL_PROD : CLIENT_URL_DEV);
  }
);
/**
 * @swagger
 * /twitter/callback:
 *   get:
 *     summary: Handle callback from Twitter OAuth
 *     description: Handles the response from Twitter after OAuth authentication is complete.
 *     responses:
 *       200:
 *         description: Successfully authenticated with Twitter.
 */

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: User sign-up
 *     description: Allows a new user to register by providing necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *               fullName:
 *                 type: string
 *                 description: User's full name.
 *     responses:
 *       201:
 *         description: User successfully created.
 */
router.post("/sign-up", authController.signup);

/**
 * @swagger
 * /verify-email:
 *   post:
 *     summary: Verify email address
 *     description: Sends a verification email to the user to confirm their email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user to verify.
 *     responses:
 *       200:
 *         description: Email verification sent.
 */

/**
 * @swagger
 * /verification-email/{email}:
 *   get:
 *     summary: Resend verification email
 *     description: Resends the verification email to a given address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email address of the user who needs a verification email.
 *     responses:
 *       200:
 *         description: Verification email resent.
 */

/**
 * @swagger
 * /sign-in:
 *   post:
 *     summary: User sign-in
 *     description: Allows an existing user to sign in using their credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: User successfully signed in.
 */
router.post("/sign-in", authController.signin);

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh authentication token
 *     description: Allows a user to refresh their authentication token when it expires.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token to obtain a new access token.
 *     responses:
 *       200:
 *         description: Successfully refreshed the token.
 */
router.post("/refresh-token", authController.refreshToken);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Sends a password reset email to the user who has forgotten their password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address to receive the password reset link.
 *     responses:
 *       200:
 *         description: Password reset email sent.
 */
router.post("/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset password
 *     description: Allows a user to reset their password using a reset token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The token used for resetting the password.
 *               newPassword:
 *                 type: string
 *                 description: The new password to be set for the user.
 *     responses:
 *       200:
 *         description: Password successfully reset.
 */
router.post("/reset-password", authController.resetPassword);

/**
 * @swagger
 * /sign-out:
 *   get:
 *     summary: User sign-out
 *     description: Logs the user out of the application by invalidating their session.
 *     responses:
 *       200:
 *         description: User successfully signed out.
 */
router.get("/sign-out", authController.signout);

/**
 * @swagger
 * /send-otp:
 *   post:
 *     summary: Send SMS OTP
 *     description: Sends an OTP code to the provided phone number for verification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User's phone number in +998XXXXXXXXX format.
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *       400:
 *         description: Invalid phone number or SMS service error.
 */
router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Telefon raqami kiritilmagan"
      });
    }

    const result = await eskizSMSService.sendOTP({ phone });
    
    if (result.success) {
      res.json({
        success: true,
        message: "SMS kod yuborildi",
        // Development muhitida kodni qaytarish (production da olib tashlash kerak)
        ...(process.env.NODE_ENV === 'development' && { code: result.code })
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error || "SMS yuborishda xatolik"
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
 * /verify-otp:
 *   post:
 *     summary: Verify SMS OTP
 *     description: Verifies the OTP code sent to the user's phone number.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User's phone number.
 *               code:
 *                 type: string
 *                 description: OTP code received via SMS.
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *       400:
 *         description: Invalid or expired OTP code.
 */
router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, code } = req.body;
    
    if (!phone || !code) {
      return res.status(400).json({
        success: false,
        message: "Telefon raqami va kod kiritilishi shart"
      });
    }

    const isValid = await eskizSMSService.verifyOTP(phone, code);
    
    if (isValid) {
      res.json({
        success: true,
        message: "Kod tasdiqlandi"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Noto'g'ri yoki muddati tugagan kod"
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
 * /phone-signup:
 *   post:
 *     summary: Register with phone number
 *     description: Register a new user using phone number and OTP verification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User's phone number.
 *               code:
 *                 type: string
 *                 description: Verified OTP code.
 *               fullName:
 *                 type: string
 *                 description: User's full name.
 *               password:
 *                 type: string
 *                 description: User's password (optional for phone registration).
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid data or OTP not verified.
 */
// TODO: Uncomment after adding phone field to Prisma schema
// router.post("/phone-signup", authController.phoneSignup);

/**
 * @swagger
 * /phone-signin:
 *   post:
 *     summary: Sign in with phone number
 *     description: Sign in using phone number and OTP verification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User's phone number.
 *               code:
 *                 type: string
 *                 description: OTP code received via SMS.
 *     responses:
 *       200:
 *         description: User signed in successfully.
 *       400:
 *         description: Invalid phone number or OTP code.
 */
// TODO: Uncomment after adding phone field to Prisma schema
// router.post("/phone-signin", authController.phoneSignin);

export default router;
