"use client";
import React, { useMemo } from "react";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import MainLayout from "@/app/components/templates/MainLayout";
import BreadCrumb from "@/app/components/feedback/BreadCrumb";
import Button from "@/app/components/atoms/Button";
import { useTranslations } from 'next-intl';
import { useGetCartQuery, useRemoveFromCartMutation, useUpdateCartItemMutation } from "@/app/store/apis/CartApi";

// Helper function to format variant name from SKU
const formatVariantName = (item: any) => {
  const { name } = item.variant.product;
  const sku = item.variant.sku;
  // Parse SKU (e.g., "TSH-RED-M" -> "Red, Medium")
  const parts = sku.split("-").slice(1); // Remove prefix (e.g., "TSH")
  const variantDetails = parts.join(", "); // Join color and size
  return `${name} - ${variantDetails}`;
};

const Cart = () => {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const { control } = useForm();
  const { data, isLoading } = useGetCartQuery({});
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  
  const cartItems = data?.cart?.cartItems || [];
  console.log("items => ", cartItems);

  const subtotal = useMemo(() => {
    if (!cartItems.length) return 0;
    return cartItems.reduce(
      (sum: number, item: any) => sum + item.variant.price * item.quantity,
      0
    );
  }, [cartItems]);
  console.log("subtotal => ", subtotal);

  const handleRemoveFromCart = async (id: string) => {
    try {
      await removeFromCart(id).unwrap();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem({ id: itemId, quantity: newQuantity }).unwrap();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <BreadCrumb />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <ShoppingCart className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t('shopping_cart') || 'Savat'}
          </h1>
          <span className="text-sm text-gray-500">
            ({cartItems.length} mahsulot)
          </span>
        </motion.div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 text-sm">Bo'sh savat</p>
                </div>
              </div>
            </div>
            <p className="text-base sm:text-lg text-gray-600 mb-6">
              {t('empty_cart') || 'Savatingiz bo\'sh'}
            </p>
            <Button
              href="/shop"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {t('continue_shopping') || 'Xarid qilishni davom ettirish'}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item: any) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-gray-400 text-sm">Rasm</div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {formatVariantName(item)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        SKU: {item.variant.sku}
                      </p>
                      <p className="text-lg font-bold text-indigo-600">
                        {item.variant.price.toLocaleString()} so'm
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('order_summary') || 'Buyurtma xulosasi'}
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Mahsulotlar ({cartItems.length})</span>
                    <span>{subtotal.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Yetkazib berish</span>
                    <span>Bepul</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Jami</span>
                    <span>{subtotal.toLocaleString()} so'm</span>
                  </div>
                </div>

                <Button
                  href="/checkout"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  {t('proceed_to_checkout') || 'To\'lovga o\'tish'}
                </Button>

                <Button
                  href="/shop"
                  variant="outline"
                  className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('continue_shopping') || 'Xaridni davom ettirish'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
