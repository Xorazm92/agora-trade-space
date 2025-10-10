import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import { WishlistService } from "./wishlist.service";

export class WishlistController {
  private wishlistService: WishlistService;

  constructor() {
    this.wishlistService = new WishlistService();
  }

  // Get user's wishlist
  getUserWishlist = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.user?.id;
      if (!userId) {
        return sendResponse(res, 401, { message: "Unauthorized" });
      }

      const wishlist = await this.wishlistService.getUserWishlist(userId);
      sendResponse(res, 200, {
        data: { wishlist },
        message: "Wishlist fetched successfully",
      });
    }
  );

  // Add product to wishlist
  addToWishlist = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.user?.id;
      const { productId } = req.body;

      if (!userId) {
        return sendResponse(res, 401, { message: "Unauthorized" });
      }

      const wishlistItem = await this.wishlistService.addToWishlist(userId, productId);
      sendResponse(res, 201, {
        data: { wishlistItem },
        message: "Product added to wishlist successfully",
      });
    }
  );

  // Remove product from wishlist
  removeFromWishlist = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.user?.id;
      const { productId } = req.params;

      if (!userId) {
        return sendResponse(res, 401, { message: "Unauthorized" });
      }

      await this.wishlistService.removeFromWishlist(userId, productId);
      sendResponse(res, 200, {
        message: "Product removed from wishlist successfully",
      });
    }
  );

  // Check if product is in wishlist
  checkWishlistStatus = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.user?.id;
      const { productId } = req.params;

      if (!userId) {
        return sendResponse(res, 401, { message: "Unauthorized" });
      }

      const isInWishlist = await this.wishlistService.isInWishlist(userId, productId);
      sendResponse(res, 200, {
        data: { isInWishlist },
        message: "Wishlist status checked successfully",
      });
    }
  );

  // Clear entire wishlist
  clearWishlist = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.user?.id;

      if (!userId) {
        return sendResponse(res, 401, { message: "Unauthorized" });
      }

      await this.wishlistService.clearWishlist(userId);
      sendResponse(res, 200, {
        message: "Wishlist cleared successfully",
      });
    }
  );
}
