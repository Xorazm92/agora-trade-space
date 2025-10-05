"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import MainLayout from "@/app/components/templates/MainLayout";
import BreadCrumb from "@/app/components/feedback/BreadCrumb";
import { useTranslations } from 'next-intl';
import { useGetCartQuery } from "@/app/store/apis/CartApi";

const CartPage = () => {
  const t = useTranslations();
  const { data, error, isLoading } = useGetCartQuery({});
  
  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: t('shopping_cart'), href: '/cart' }
  ];

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <BreadCrumb items={breadcrumbItems} />
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Loading cart...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    console.log("Cart API error:", error);
  }

  const cartItems = data?.items || [];
  const isEmpty = cartItems.length === 0;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <BreadCrumb items={breadcrumbItems} />
        
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <ShoppingCart className="w-24 h-24 text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {t('shopping_cart')}
          </h1>
          {isEmpty ? (
            <>
              <p className="text-gray-600 mb-8">
                Your cart is empty. Start shopping to add items!
              </p>
              <a 
                href="/shop" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue Shopping
              </a>
            </>
          ) : (
            <div className="w-full max-w-4xl">
              <p className="text-gray-600 mb-4">
                You have {cartItems.length} item(s) in your cart
              </p>
              {/* Cart items would be rendered here */}
              <div className="grid gap-4">
                {cartItems.map((item: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.name || `Item ${index + 1}`}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity || 1}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{item.price || 'Price not available'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
