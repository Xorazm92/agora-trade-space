import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../slices/ApiSlice";

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    averageRating: number;
    reviewCount: number;
    variants: Array<{
      id: string;
      price: number;
      images: string[];
      stock: number;
    }>;
    category?: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

export interface WishlistResponse {
  wishlist: WishlistItem[];
}

export interface AddToWishlistRequest {
  productId: string;
}

export interface WishlistStatusResponse {
  isInWishlist: boolean;
}

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    // Get user's wishlist
    getUserWishlist: builder.query<WishlistResponse, void>({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),
      providesTags: ["Wishlist"],
    }),

    // Add product to wishlist
    addToWishlist: builder.mutation<WishlistItem, AddToWishlistRequest>({
      query: (data) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // Remove product from wishlist
    removeFromWishlist: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // Check if product is in wishlist
    checkWishlistStatus: builder.query<WishlistStatusResponse, string>({
      query: (productId) => ({
        url: `/wishlist/check/${productId}`,
        method: "GET",
      }),
      providesTags: (result, error, productId) => [
        { type: "Wishlist", id: productId },
      ],
    }),

    // Clear entire wishlist
    clearWishlist: builder.mutation<void, void>({
      query: () => ({
        url: "/wishlist/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetUserWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useCheckWishlistStatusQuery,
  useClearWishlistMutation,
} = wishlistApi;
