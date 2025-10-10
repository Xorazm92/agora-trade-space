"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useGetAllReviewsQuery, useUpdateReviewStatusMutation } from "@/app/store/apis/ReviewApi";
import { 
  Star, 
  MessageSquare, 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Filter,
  Search,
  User,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";

const ReviewsPage = () => {
  const t = useTranslations("dashboard");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: reviewsData, isLoading, refetch } = useGetAllReviewsQuery({
    status: statusFilter === "all" ? undefined : statusFilter,
    rating: ratingFilter === "all" ? undefined : parseInt(ratingFilter),
    search: searchTerm || undefined,
  });

  const [updateReviewStatus] = useUpdateReviewStatusMutation();

  const reviews = reviewsData?.reviews || [];

  const handleStatusUpdate = async (reviewId: string, status: string) => {
    try {
      await updateReviewStatus({ reviewId, status }).unwrap();
      refetch();
      alert("Sharh holati yangilandi");
    } catch (error) {
      alert("Xatolik yuz berdi");
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sharhlar boshqaruvi</h1>
          <p className="text-gray-600">Mijozlar sharhlarini boshqaring va moderation qiling</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jami sharhlar</p>
              <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">O'rtacha reyting</p>
              <div className="flex items-center space-x-1">
                <p className="text-2xl font-bold text-yellow-600">{getAverageRating()}</p>
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tasdiqlangan</p>
              <p className="text-2xl font-bold text-green-600">
                {reviews.filter((r: any) => r.status === "APPROVED").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Kutilmoqda</p>
              <p className="text-2xl font-bold text-orange-600">
                {reviews.filter((r: any) => r.status === "PENDING").length}
              </p>
            </div>
            <Eye className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Sharh matni yoki mahsulot nomi bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="md:w-40">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Barcha holat</option>
              <option value="PENDING">Kutilmoqda</option>
              <option value="APPROVED">Tasdiqlangan</option>
              <option value="REJECTED">Rad etilgan</option>
            </select>
          </div>

          <div className="md:w-40">
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Barcha reyting</option>
              <option value="5">5 yulduz</option>
              <option value="4">4 yulduz</option>
              <option value="3">3 yulduz</option>
              <option value="2">2 yulduz</option>
              <option value="1">1 yulduz</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="divide-y divide-gray-200">
          {reviews.map((review: any) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 hover:bg-gray-50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">
                        {review.user?.name || "Anonim"}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        {review.rating}/5
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(review.createdAt).toLocaleDateString('uz-UZ')}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">Mahsulot:</p>
                    <p className="font-medium text-gray-900">{review.product?.name}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      review.status === "APPROVED" 
                        ? "bg-green-100 text-green-800"
                        : review.status === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {review.status === "APPROVED" ? "Tasdiqlangan" :
                       review.status === "REJECTED" ? "Rad etilgan" : "Kutilmoqda"}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {review.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(review.id, "APPROVED")}
                        className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50"
                        title="Tasdiqlash"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleStatusUpdate(review.id, "REJECTED")}
                        className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                        title="Rad etish"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => {
                      if (confirm("Sharhni o'chirmoqchimisiz?")) {
                        // handleDeleteReview(review.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {reviews.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Sharhlar topilmadi</h3>
            <p className="mt-1 text-sm text-gray-500">
              Hozircha hech qanday sharh yo'q yoki filtr shartlariga mos keluvchi sharh topilmadi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
