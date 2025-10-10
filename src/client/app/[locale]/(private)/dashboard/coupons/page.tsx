"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { 
  Percent, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Users,
  DollarSign,
  Tag,
  Copy,
  CheckCircle,
  XCircle
} from "lucide-react";
import { motion } from "framer-motion";

const CouponsPage = () => {
  const t = useTranslations("dashboard");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  // Mock data - real implementation'da API'dan keladi
  const coupons = [
    {
      id: "1",
      code: "WELCOME10",
      type: "PERCENTAGE",
      value: 10,
      description: "Yangi mijozlar uchun 10% chegirma",
      minOrderAmount: 50000,
      maxDiscount: 25000,
      usageLimit: 100,
      usedCount: 23,
      isActive: true,
      expiresAt: "2024-12-31",
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      code: "SUMMER50",
      type: "FIXED",
      value: 50000,
      description: "Yoz aksiyasi - 50,000 so'm chegirma",
      minOrderAmount: 200000,
      maxDiscount: 50000,
      usageLimit: 50,
      usedCount: 12,
      isActive: true,
      expiresAt: "2024-08-31",
      createdAt: "2024-06-01"
    },
    {
      id: "3",
      code: "EXPIRED20",
      type: "PERCENTAGE", 
      value: 20,
      description: "Muddati tugagan kupon",
      minOrderAmount: 100000,
      maxDiscount: 40000,
      usageLimit: 200,
      usedCount: 156,
      isActive: false,
      expiresAt: "2024-03-31",
      createdAt: "2024-01-01"
    }
  ];

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Kupon kodi nusxalandi!");
  };

  const CouponForm = ({ coupon, onClose }: { coupon?: any; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      code: coupon?.code || "",
      type: coupon?.type || "PERCENTAGE",
      value: coupon?.value || "",
      description: coupon?.description || "",
      minOrderAmount: coupon?.minOrderAmount || "",
      maxDiscount: coupon?.maxDiscount || "",
      usageLimit: coupon?.usageLimit || "",
      expiresAt: coupon?.expiresAt || "",
      isActive: coupon?.isActive ?? true
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // API call to create/update coupon
      console.log("Coupon data:", formData);
      alert(coupon ? "Kupon yangilandi!" : "Yangi kupon yaratildi!");
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {coupon ? "Kuponni tahrirlash" : "Yangi kupon yaratish"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kupon kodi
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="WELCOME10"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chegirma turi
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="PERCENTAGE">Foiz (%) </option>
                <option value="FIXED">Qat'iy summa (so'm)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chegirma miqdori
              </label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={formData.type === "PERCENTAGE" ? "10" : "50000"}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tavsif
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                placeholder="Kupon haqida qisqacha ma'lumot"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimal buyurtma summasi (so'm)
              </label>
              <input
                type="number"
                value={formData.minOrderAmount}
                onChange={(e) => setFormData({...formData, minOrderAmount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="50000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maksimal chegirma (so'm)
              </label>
              <input
                type="number"
                value={formData.maxDiscount}
                onChange={(e) => setFormData({...formData, maxDiscount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="25000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foydalanish limiti
              </label>
              <input
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({...formData, usageLimit: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amal qilish muddati
              </label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({...formData, expiresAt: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Faol holat
              </label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {coupon ? "Yangilash" : "Yaratish"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Bekor qilish
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kuponlar va chegirmalar</h1>
          <p className="text-gray-600">Chegirma kuponlarini yarating va boshqaring</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi kupon</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jami kuponlar</p>
              <p className="text-2xl font-bold text-gray-900">{coupons.length}</p>
            </div>
            <Tag className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Faol kuponlar</p>
              <p className="text-2xl font-bold text-green-600">
                {coupons.filter(c => c.isActive).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jami foydalanish</p>
              <p className="text-2xl font-bold text-purple-600">
                {coupons.reduce((sum, c) => sum + c.usedCount, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tejamkorlik</p>
              <p className="text-2xl font-bold text-orange-600">2.5M</p>
              <p className="text-xs text-gray-500">so'm</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Coupons List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="divide-y divide-gray-200">
          {coupons.map((coupon) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 px-3 py-1 rounded-lg font-mono text-sm font-bold">
                        {coupon.code}
                      </code>
                      <button
                        onClick={() => handleCopyCoupon(coupon.code)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Nusxalash"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      coupon.isActive 
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {coupon.isActive ? "Faol" : "Nofaol"}
                    </span>

                    <div className="flex items-center text-sm text-gray-500">
                      <Percent className="w-4 h-4 mr-1" />
                      {coupon.type === "PERCENTAGE" ? `${coupon.value}%` : `${coupon.value.toLocaleString()} so'm`}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{coupon.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Min: {coupon.minOrderAmount.toLocaleString()} so'm
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {coupon.usedCount}/{coupon.usageLimit} ishlatilgan
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(coupon.expiresAt).toLocaleDateString('uz-UZ')} gacha
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Foydalanish darajasi</span>
                      <span>{Math.round((coupon.usedCount / coupon.usageLimit) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setSelectedCoupon(coupon);
                      setShowCreateModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-700 p-2 rounded-lg hover:bg-indigo-50"
                    title="Tahrirlash"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => {
                      if (confirm("Kuponni o'chirmoqchimisiz?")) {
                        alert("Kupon o'chirildi!");
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
        
        {coupons.length === 0 && (
          <div className="text-center py-12">
            <Tag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Kuponlar topilmadi</h3>
            <p className="mt-1 text-sm text-gray-500">
              Hozircha hech qanday kupon yaratilmagan.
            </p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <CouponForm 
          coupon={selectedCoupon}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedCoupon(null);
          }}
        />
      )}
    </div>
  );
};

export default CouponsPage;
