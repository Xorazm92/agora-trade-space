import { PrismaClient } from "@prisma/client";
import AppError from "@/shared/errors/AppError";

export class WishlistService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Get user's wishlist with product details
  async getUserWishlist(userId: string) {
    const wishlist = await this.prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            variants: {
              take: 1,
              orderBy: { price: 'asc' }
            },
            category: true,
            reviews: {
              select: {
                rating: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate average rating for each product
    const wishlistWithRatings = wishlist.map((item: any) => ({
      ...item,
      product: {
        ...item.product,
        averageRating: item.product.reviews.length > 0 
          ? item.product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / item.product.reviews.length
          : 0,
        reviewCount: item.product.reviews.length
      }
    }));

    return wishlistWithRatings;
  }

  // Add product to wishlist
  async addToWishlist(userId: string, productId: string) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      throw new AppError(404, "Product not found");
    }

    // Check if already in wishlist
    const existingItem = await this.prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    if (existingItem) {
      throw new AppError(400, "Product already in wishlist");
    }

    // Add to wishlist
    const wishlistItem = await this.prisma.wishlist.create({
      data: {
        userId,
        productId
      },
      include: {
        product: {
          include: {
            variants: {
              take: 1,
              orderBy: { price: 'asc' }
            }
          }
        }
      }
    });

    return wishlistItem;
  }

  // Remove product from wishlist
  async removeFromWishlist(userId: string, productId: string) {
    const wishlistItem = await this.prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    if (!wishlistItem) {
      throw new AppError(404, "Product not found in wishlist");
    }

    await this.prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    return true;
  }

  // Check if product is in user's wishlist
  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const wishlistItem = await this.prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    return !!wishlistItem;
  }

  // Clear entire wishlist
  async clearWishlist(userId: string) {
    await this.prisma.wishlist.deleteMany({
      where: { userId }
    });

    return true;
  }

  // Get wishlist count for user
  async getWishlistCount(userId: string): Promise<number> {
    const count = await this.prisma.wishlist.count({
      where: { userId }
    });

    return count;
  }
}
