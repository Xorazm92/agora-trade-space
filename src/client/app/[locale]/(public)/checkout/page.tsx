"use client";
import React, { useState } from "react";
import MainLayout from "@/app/components/templates/MainLayout";
import BreadCrumb from "@/app/components/feedback/BreadCrumb";
import { useTranslations } from 'next-intl';
import { useGetCartQuery } from "@/app/store/apis/CartApi";
import useFormatPrice from "@/app/hooks/ui/useFormatPrice";
import { CreditCard, MapPin, Phone, User, Mail, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CheckoutPage = () => {
  const t = useTranslations();
  const { data, error, isLoading } = useGetCartQuery({});
  const formatPrice = useFormatPrice();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    paymentMethod: 'cash'
  });

  const cart = data?.cart;
  const cartItems = cart?.cartItems || [];
  const isEmpty = cartItems.length === 0;

  // Jami narxni hisoblash
  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: any) => {
      return total + (item.variant?.price || 0) * (item.quantity || 1);
    }, 0);
  };

  const totalPrice = calculateTotal();
  const shippingCost = 0; // Bepul yetkazib berish
  const finalTotal = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Bu yerda buyurtma berish logikasi bo'ladi
    console.log('Order data:', { formData, cartItems, totalPrice: finalTotal });
    alert('Buyurtma muvaffaqiyatli berildi! (Demo)');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isEmpty) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Savatchangiz bo'sh
            </h2>
            <p className="text-gray-600 mb-6">
              Buyurtma berish uchun avval mahsulot qo'shing
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Xarid qilish
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <BreadCrumb />
          
          <div className="mt-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Buyurtma berish
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Buyurtma ma'lumotlari */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Shaxsiy ma'lumotlar */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Shaxsiy ma'lumotlar
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ism *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Ismingizni kiriting"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Familiya *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Familiyangizni kiriting"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-1" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="email@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-1" />
                          Telefon raqami *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="+998 90 123 45 67"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Yetkazib berish manzili */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Yetkazib berish manzili
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Manzil *
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="To'liq manzilingizni kiriting"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Shahar *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Toshkent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Viloyat *
                          </label>
                          <select
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Viloyatni tanlang</option>
                            <option value="toshkent">Toshkent</option>
                            <option value="samarqand">Samarqand</option>
                            <option value="buxoro">Buxoro</option>
                            <option value="andijon">Andijon</option>
                            <option value="fargona">Farg'ona</option>
                            <option value="namangan">Namangan</option>
                            <option value="qashqadaryo">Qashqadaryo</option>
                            <option value="surxondaryo">Surxondaryo</option>
                            <option value="jizzax">Jizzax</option>
                            <option value="sirdaryo">Sirdaryo</option>
                            <option value="navoiy">Navoiy</option>
                            <option value="xorazm">Xorazm</option>
                            <option value="qoraqalpogiston">Qoraqalpog'iston</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* To'lov usuli */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      To'lov usuli
                    </h2>
                    
                    <div className="space-y-3">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">Naqd pul</div>
                          <div className="text-sm text-gray-500">Yetkazib berishda to'lov</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">Bank kartasi</div>
                          <div className="text-sm text-gray-500">Click, Payme, Uzum Bank</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Buyurtma xulosasi */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Buyurtma xulosasi
                    </h2>
                    
                    {/* Mahsulotlar ro'yxati */}
                    <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                      {cartItems.map((item: any) => (
                        <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            {item.variant?.images?.[0] ? (
                              <Image
                                src={item.variant.images[0]}
                                alt={item.variant?.product?.name || 'Product'}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                <ShoppingBag className="w-4 h-4 text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {item.variant?.product?.name || 'Mahsulot'}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {item.quantity} x {formatPrice(item.variant?.price || 0)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mahsulotlar</span>
                        <span className="font-medium">{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Yetkazib berish</span>
                        <span className="font-medium text-green-600">Bepul</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Jami</span>
                        <span className="text-indigo-600">{formatPrice(finalTotal)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                    >
                      Buyurtma berish
                    </button>
                    
                    <Link
                      href="/cart"
                      className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center block"
                    >
                      Savatchaga qaytish
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
