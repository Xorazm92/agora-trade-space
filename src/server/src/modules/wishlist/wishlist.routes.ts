import { Router } from "express";
import { WishlistController } from "./wishlist.controller";
import { authenticateToken } from "@/shared/middlewares/auth";

const router = Router();
const wishlistController = new WishlistController();

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get user's wishlist
 *     description: Retrieves all products in the user's wishlist
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateToken, wishlistController.getUserWishlist);

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add product to wishlist
 *     description: Adds a product to the user's wishlist
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add
 *     responses:
 *       201:
 *         description: Product added to wishlist successfully
 *       400:
 *         description: Product already in wishlist
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.post("/", authenticateToken, wishlistController.addToWishlist);

/**
 * @swagger
 * /wishlist/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     description: Removes a product from the user's wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in wishlist
 */
router.delete("/:productId", authenticateToken, wishlistController.removeFromWishlist);

/**
 * @swagger
 * /wishlist/check/{productId}:
 *   get:
 *     summary: Check if product is in wishlist
 *     description: Checks if a specific product is in the user's wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to check
 *     responses:
 *       200:
 *         description: Wishlist status checked successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/check/:productId", authenticateToken, wishlistController.checkWishlistStatus);

/**
 * @swagger
 * /wishlist/clear:
 *   delete:
 *     summary: Clear entire wishlist
 *     description: Removes all products from the user's wishlist
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist cleared successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/clear", authenticateToken, wishlistController.clearWishlist);

export default router;
