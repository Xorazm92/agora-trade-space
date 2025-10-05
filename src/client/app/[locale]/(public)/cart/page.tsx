"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import MainLayout from "@/app/components/templates/MainLayout";
import BreadCrumb from "@/app/components/feedback/BreadCrumb";
import { useTranslations } from 'next-intl';
import { useGetCartQuery, useUpdateCartItemMutation, useRemoveFromCartMutation } from "@/app/store/apis/CartApi";
import useFormatPrice from "@/app/hooks/ui/useFormatPrice";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CartPage = () => {
  const t = useTranslations();
  const { data, error, isLoading } = useGetCartQuery({});
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const formatPrice = useFormatPrice();
  const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({});
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <BreadCrumb />
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">{t('common.loading')}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    console.log("Cart API error:", error);
  }

  console.log("Cart data:", data);
  console.log("Cart error:", error);
  console.log("Cart loading:", isLoading);

  const cart = data?.cart;
  const cartItems = cart?.cartItems || [];
  const isEmpty = cartItems.length === 0;

  // Cart funksiyalari
  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setLoadingItems(prev => ({ ...prev, [itemId]: true }));
    try {
      await updateCartItem({ id: itemId, quantity: newQuantity });
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoadingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setLoadingItems(prev => ({ ...prev, [itemId]: true }));
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoadingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // Jami narxni hisoblash
  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: any) => {
      return total + (item.variant?.price || 0) * (item.quantity || 1);
    }, 0);
  };

  const totalPrice = calculateTotal();

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <BreadCrumb />
          
          <div className="mt-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {t('cart.shopping_cart')} {!isEmpty && `(${cartItems.length})`}
            </h1>

            {isEmpty ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Savatchangiz bo'sh
                </h2>
                <p className="text-gray-600 mb-6">
                  Xarid qilishni boshlang va sevimli mahsulotlaringizni qo'shing!
                </p>
                <Link 
                  href="/shop" 
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {t('cart.continue_shopping')}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item: any) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {item.variant?.images?.[0] ? (
                            <Image
                              src={item.variant.images[0]}
                              alt={item.variant?.product?.name || 'Product'}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <ShoppingCart className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {item.variant?.product?.name || 'Mahsulot'}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            SKU: {item.variant?.sku || 'N/A'}
                          </p>
                          <p className="text-lg font-bold text-indigo-600">
                            {formatPrice(item.variant?.price || 0)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || loadingItems[item.id]}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={loadingItems[item.id]}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={loadingItems[item.id]}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Buyurtma xulosasi
                    </h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mahsulotlar ({cartItems.length})</span>
                        <span className="font-medium">{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Yetkazib berish</span>
                        <span className="font-medium text-green-600">Bepul</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Jami</span>
                        <span className="text-indigo-600">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    <Link
                      href="/checkout"
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-center block"
                    >
                      Buyurtma berish
                    </Link>
                    
                    <Link
                      href="/shop"
                      className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center block"
                    >
                      Xaridni davom ettirish
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
