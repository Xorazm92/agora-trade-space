"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useCheckWishlistStatusQuery } from "@/app/store/apis/WishlistApi";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
// import { toast } from "react-hot-toast";

interface WishlistButtonProps {
  productId: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  size = "md",
  showText = false,
  className = "",
}) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  // Check if product is in wishlist
  const { data: wishlistStatus, refetch } = useCheckWishlistStatusQuery(productId, {
    skip: !isAuthenticated,
  });

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const isInWishlist = wishlistStatus?.isInWishlist || false;

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert("Sevimlilar ro'yxatiga qo'shish uchun tizimga kiring");
      return;
    }

    setIsLoading(true);

    try {
      if (isInWishlist) {
        await removeFromWishlist(productId).unwrap();
        // toast.success("Sevimlilar ro'yxatidan olib tashlandi");
      } else {
        await addToWishlist({ productId }).unwrap();
        // toast.success("Sevimlilar ro'yxatiga qo'shildi");
      }
      refetch();
    } catch (error: any) {
      alert(error?.data?.message || "Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: "w-6 h-6 p-1",
    md: "w-8 h-8 p-1.5",
    lg: "w-10 h-10 p-2",
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={isLoading}
      className={`
        ${sizeClasses[size]}
        ${isInWishlist 
          ? "bg-pink-100 text-pink-600 border-pink-200" 
          : "bg-white text-gray-400 border-gray-200 hover:text-pink-500 hover:border-pink-200"
        }
        border rounded-full transition-all duration-200 
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center
        ${showText ? "px-3 py-2 space-x-2" : ""}
        ${className}
      `}
      title={isInWishlist ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
    >
      <Heart
        size={iconSizes[size]}
        className={`transition-all duration-200 ${
          isInWishlist ? "fill-current" : ""
        } ${isLoading ? "animate-pulse" : ""}`}
      />
      {showText && (
        <span className="text-sm font-medium">
          {isInWishlist ? "Sevimli" : "Sevimlilar"}
        </span>
      )}
    </button>
  );
};

export default WishlistButton;
