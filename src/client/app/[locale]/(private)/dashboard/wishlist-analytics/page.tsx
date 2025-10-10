"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useGetUserWishlistQuery } from "@/app/store/apis/WishlistApi";
import { 
  Heart, 
  TrendingUp, 
  Users, 
  Package,
  Eye,
  ShoppingCart,
  Calendar,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

const WishlistAnalyticsPage = () => {
  const t = useTranslations("dashboard");

  // Mock data - real implementation'da API'dan keladi
  const wishlistStats = {
    totalWishlists: 1247,
    activeUsers: 892,
    conversionRate: 23.5,
    topProducts: [
      {
        id: "1",
        name: "LEGO Classic Creative Bricks",
        wishlistCount: 156,
        conversionRate: 34.2,
        category: "O'yinchoqlar",
        price: 125000,
        image: "/placeholder-product.jpg"
      },
      {
        id: "2", 
        name: "Fisher-Price Rock-a-Stack",
        wishlistCount: 134,
        conversionRate: 28.7,
        category: "Chaqaloq o'yinchoqlari",
        price: 85000,
        image: "/placeholder-product.jpg"
      },
      {
        id: "3",
        name: "Barbie Dreamhouse",
        wishlistCount: 98,
        conversionRate: 41.8,
        category: "Qo'g'irchoqlar",
        price: 450000,
        image: "/placeholder-product.jpg"
      },
      {
        id: "4",
        name: "Hot Wheels Track Set",
        wishlistCount: 87,
        conversionRate: 31.0,
        category: "Mashina va transport",
        price: 95000,
        image: "/placeholder-product.jpg"
      },
      {
        id: "5",
        name: "Melissa & Doug Wooden Puzzle",
        wishlistCount: 76,
        conversionRate: 25.3,
        category: "Ta'limiy o'yinchoqlar",
        price: 65000,
        image: "/placeholder-product.jpg"
      }
    ],
    categoryStats: [
      { name: "O'yinchoqlar", count: 423, percentage: 33.9 },
      { name: "Bolalar kiyimlari", count: 298, percentage: 23.9 },
      { name: "Chaqaloq mahsulotlari", count: 187, percentage: 15.0 },
      { name: "Bolalar poyabzallari", count: 156, percentage: 12.5 },
      { name: "Bolalar kitoblari", count: 183, percentage: 14.7 }
    ],
    recentActivity: [
      {
        id: "1",
        user: "Aziza Karimova",
        product: "LEGO Classic Set",
        action: "added",
        timestamp: "2024-01-09T10:30:00Z"
      },
      {
        id: "2",
        user: "Bobur Toshmatov", 
        product: "Barbie Doll",
        action: "purchased",
        timestamp: "2024-01-09T09:15:00Z"
      },
      {
        id: "3",
        user: "Malika Abdullayeva",
        product: "Fisher-Price Toy",
        action: "removed",
        timestamp: "2024-01-09T08:45:00Z"
      }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sevimlilar Analytics</h1>
          <p className="text-gray-600">Mijozlar sevimlilar ro'yxati statistikasi va tahlili</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jami sevimlilar</p>
              <p className="text-2xl font-bold text-gray-900">{wishlistStats.totalWishlists.toLocaleString()}</p>
            </div>
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Faol foydalanuvchilar</p>
              <p className="text-2xl font-bold text-blue-600">{wishlistStats.activeUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Konversiya darajasi</p>
              <p className="text-2xl font-bold text-green-600">{wishlistStats.conversionRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Top mahsulotlar</p>
              <p className="text-2xl font-bold text-purple-600">{wishlistStats.topProducts.length}</p>
            </div>
            <Package className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Wishlist Products */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Eng ko'p sevimli mahsulotlar</h2>
            <p className="text-sm text-gray-600">Sevimlilar ro'yxatiga eng ko'p qo'shilgan mahsulotlar</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {wishlistStats.topProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <span className="text-sm font-medium text-gray-900">
                        #{index + 1}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">{product.category}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {product.price.toLocaleString()} so'm
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 text-pink-500 mr-1" />
                        <span className="text-sm text-gray-600">{product.wishlistCount} sevimli</span>
                      </div>
                      
                      <div className="flex items-center">
                        <ShoppingCart className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-gray-600">{product.conversionRate}% konversiya</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Kategoriya bo'yicha taqsimot</h2>
            <p className="text-sm text-gray-600">Sevimlilar kategoriyalar bo'yicha statistikasi</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {wishlistStats.categoryStats.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{category.count}</span>
                    <span className="text-sm font-medium text-gray-900">{category.percentage}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Progress bars */}
            <div className="mt-6 space-y-3">
              {wishlistStats.categoryStats.map((category, index) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{category.name}</span>
                    <span>{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-indigo-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">So'nggi faollik</h2>
          <p className="text-sm text-gray-600">Sevimlilar ro'yxatidagi so'nggi o'zgarishlar</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {wishlistStats.recentActivity.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.action === "added" ? "bg-green-100" :
                  activity.action === "purchased" ? "bg-blue-100" : "bg-red-100"
                }`}>
                  {activity.action === "added" ? (
                    <Heart className="w-4 h-4 text-green-600" />
                  ) : activity.action === "purchased" ? (
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Heart className="w-4 h-4 text-red-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>
                    {activity.action === "added" ? " sevimlilar ro'yxatiga qo'shdi" :
                     activity.action === "purchased" ? " sotib oldi" : " sevimlilardan olib tashladi"}
                    <span className="font-medium"> {activity.product}</span>
                  </p>
                  
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(activity.timestamp).toLocaleString('uz-UZ')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistAnalyticsPage;
