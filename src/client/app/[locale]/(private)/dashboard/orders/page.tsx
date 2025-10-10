"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "@/app/store/apis/OrderApi";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Filter,
  Search,
  Calendar,
  DollarSign,
  User
} from "lucide-react";
import { motion } from "framer-motion";

const OrdersPage = () => {
  const t = useTranslations("dashboard");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { data: ordersData, isLoading, refetch } = useGetAllOrdersQuery({
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm || undefined,
  });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const orders = ordersData?.orders || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-4 h-4 text-yellow-500" />;
      case "PROCESSING": return <Package className="w-4 h-4 text-blue-500" />;
      case "SHIPPED": return <Truck className="w-4 h-4 text-purple-500" />;
      case "DELIVERED": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "CANCELED": return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800";
      case "PROCESSING": return "bg-blue-100 text-blue-800";
      case "SHIPPED": return "bg-purple-100 text-purple-800";
      case "DELIVERED": return "bg-green-100 text-green-800";
      case "CANCELED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      refetch();
      alert("Buyurtma holati yangilandi");
    } catch (error) {
      alert("Xatolik yuz berdi");
    }
  };

  const statusOptions = [
    { value: "all", label: "Barcha buyurtmalar" },
    { value: "PENDING", label: "Kutilmoqda" },
    { value: "PROCESSING", label: "Jarayonda" },
    { value: "SHIPPED", label: "Yuborilgan" },
    { value: "DELIVERED", label: "Yetkazilgan" },
    { value: "CANCELED", label: "Bekor qilingan" },
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">Buyurtmalar boshqaruvi</h1>
          <p className="text-gray-600">Barcha buyurtmalarni boshqaring va kuzating</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jami buyurtmalar</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Kutilmoqda</p>
              <p className="text-2xl font-bold text-yellow-600">
                {orders.filter((o: any) => o.status === "PENDING").length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jarayonda</p>
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter((o: any) => o.status === "PROCESSING").length}
              </p>
            </div>
            <Truck className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Yetkazilgan</p>
              <p className="text-2xl font-bold text-green-600">
                {orders.filter((o: any) => o.status === "DELIVERED").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
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
                placeholder="Buyurtma ID yoki mijoz nomi bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyurtma
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mijoz
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sana
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Summa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harakatlar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order: any) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{order.id.slice(-8)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">
                        {order.user?.name || "Noma'lum"}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                      <div className="text-sm font-medium text-gray-900">
                        {order.totalAmount?.toLocaleString()} so'm
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ko'rish
                      </button>
                      
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="PENDING">Kutilmoqda</option>
                        <option value="PROCESSING">Jarayonda</option>
                        <option value="SHIPPED">Yuborilgan</option>
                        <option value="DELIVERED">Yetkazilgan</option>
                        <option value="CANCELED">Bekor qilingan</option>
                      </select>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Buyurtmalar topilmadi</h3>
            <p className="mt-1 text-sm text-gray-500">
              Hozircha hech qanday buyurtma yo'q yoki filtr shartlariga mos keluvchi buyurtma topilmadi.
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Buyurtma tafsilotlari</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Buyurtma ID:</h3>
                <p className="text-gray-600">#{selectedOrder.id}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Mijoz:</h3>
                <p className="text-gray-600">{selectedOrder.user?.name || "Noma'lum"}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Jami summa:</h3>
                <p className="text-gray-600">{selectedOrder.totalAmount?.toLocaleString()} so'm</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Holat:</h3>
                <div className="flex items-center mt-1">
                  {getStatusIcon(selectedOrder.status)}
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Buyurtma sanasi:</h3>
                <p className="text-gray-600">
                  {new Date(selectedOrder.createdAt).toLocaleString('uz-UZ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
