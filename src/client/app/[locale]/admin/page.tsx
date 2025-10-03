"use client";
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Package,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  Settings,
  Bell
} from 'lucide-react';
import Link from 'next/link';

const AdminPage = () => {
  const t = useTranslations('admin');

  const stats = [
    {
      title: 'Jami foydalanuvchilar',
      value: '2,543',
      change: '+12%',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Bugungi buyurtmalar',
      value: '127',
      change: '+8%',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Jami mahsulotlar',
      value: '1,234',
      change: '+3%',
      icon: <Package className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Bugungi daromad',
      value: '₽ 45,678',
      change: '+15%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-yellow-500'
    }
  ];

  const quickActions = [
    {
      title: 'Yangi mahsulot qo\'shish',
      description: 'Katalogga yangi mahsulot qo\'shing',
      icon: <Plus className="w-5 h-5" />,
      href: '/admin/products/create',
      color: 'bg-indigo-500'
    },
    {
      title: 'Buyurtmalarni ko\'rish',
      description: 'Barcha buyurtmalarni boshqaring',
      icon: <Eye className="w-5 h-5" />,
      href: '/admin/orders',
      color: 'bg-green-500'
    },
    {
      title: 'Foydalanuvchilar',
      description: 'Foydalanuvchilarni boshqaring',
      icon: <Users className="w-5 h-5" />,
      href: '/admin/users',
      color: 'bg-blue-500'
    },
    {
      title: 'Sozlamalar',
      description: 'Tizim sozlamalarini o\'zgartiring',
      icon: <Settings className="w-5 h-5" />,
      href: '/admin/settings',
      color: 'bg-gray-500'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'Akmal Karimov', amount: '₽ 1,250', status: 'Yangi' },
    { id: '#1235', customer: 'Malika Tosheva', amount: '₽ 890', status: 'Jarayonda' },
    { id: '#1236', customer: 'Bobur Aliev', amount: '₽ 2,100', status: 'Yetkazildi' },
    { id: '#1237', customer: 'Nigora Saidova', amount: '₽ 750', status: 'Yangi' },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Admin Panel
                </h1>
                <p className="text-gray-600 mt-1">
                  Inbola do'koni boshqaruv paneli
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Bell className="w-6 h-6" />
                </button>
                <Link
                  href="/admin/settings"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Sozlamalar
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`${stat.color} text-white p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Tezkor amallar
              </h2>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${action.color} text-white p-2 rounded-lg`}>
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      So'nggi buyurtmalar
                    </h2>
                    <Link
                      href="/admin/orders"
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      Barchasini ko'rish
                    </Link>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Buyurtma ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mijoz
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Summa
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Holat
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === 'Yangi' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Jarayonda' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sotuv statistikasi
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Grafik yuklanmoqda...</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Foydalanuvchilar faolligi
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Grafik yuklanmoqda...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
