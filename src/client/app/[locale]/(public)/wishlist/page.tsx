"use client";
import React from "react";
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { useGetUserWishlistQuery, useClearWishlistMutation } from '@/app/store/apis/WishlistApi';
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import WishlistButton from '@/app/components/molecules/WishlistButton';
// import { toast } from "react-hot-toast";

const WishlistPage = () => {
  const t = useTranslations('common');
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, error } = useGetUserWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [clearWishlist, { isLoading: isClearingWishlist }] = useClearWishlistMutation();

  const wishlistItems = data?.wishlist || [];

  const handleClearWishlist = async () => {
    if (window.confirm("Barcha sevimli mahsulotlarni o'chirmoqchimisiz?")) {
      try {
        await clearWishlist({}).unwrap();
        alert("Sevimlilar ro'yxati tozalandi");
      } catch (error: any) {
        alert(error?.data?.message || "Xatolik yuz berdi");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Sevimlilar ro'yxati
              </h1>
              <p className="text-gray-600 mb-8">
                Sevimli mahsulotlaringizni ko'rish uchun tizimga kiring
              </p>
              <Link
                href="/auth/signin"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Tizimga kirish
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1,2,3,4,5,6,7,8].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-red-500 text-xl mb-4">Xatolik yuz berdi</div>
              <p className="text-gray-600">Sevimlilar ro'yxatini yuklashda muammo</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Sevimlilar ro'yxati bo'sh
              </h1>
              <p className="text-gray-600 mb-8">
                Hali hech qanday mahsulot sevimlilar ro'yxatiga qo'shilmagan
              </p>
              <Link
                href="/shop"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Mahsulotlarni ko'rish
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sevimlilar ro'yxati
              </h1>
              <p className="text-gray-600">
                {wishlistItems.length} ta sevimli mahsulot
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <button
                onClick={handleClearWishlist}
                disabled={isClearingWishlist}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
              >
                <Trash2 size={16} />
                <span>Barchasini o'chirish</span>
              </button>
            )}
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => {
              const product = item.product;
              const variant = product.variants[0];
              const imageUrl = variant?.images?.[0] || '/placeholder-product.jpg';

              return (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <Link href={`/product/${product.slug}`}>
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <div className="absolute top-2 right-2">
                      <WishlistButton productId={product.id} size="sm" />
                    </div>
                  </div>

                  <div className="p-4">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-medium text-gray-900 mb-2 hover:text-indigo-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {product.category && (
                      <p className="text-sm text-gray-500 mb-2">
                        {product.category.name}
                      </p>
                    )}

                    {/* Rating */}
                    {product.averageRating > 0 && (
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                          {product.averageRating.toFixed(1)} ({product.reviewCount})
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">
                        {variant?.price?.toLocaleString()} so'm
                      </div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                        title="Mahsulotni ko'rish"
                      >
                        <ShoppingCart size={16} />
                      </Link>
                    </div>

                    {/* Stock status */}
                    {variant && (
                      <div className="mt-2">
                        {variant.stock > 0 ? (
                          <span className="text-sm text-green-600">
                            Mavjud ({variant.stock} dona)
                          </span>
                        ) : (
                          <span className="text-sm text-red-600">
                            Tugagan
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Xarid qilishni davom ettirish
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WishlistPage;
