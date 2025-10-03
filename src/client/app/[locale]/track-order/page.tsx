"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Phone,
  Mail,
  Calendar,
  User,
  CreditCard,
  AlertCircle
} from 'lucide-react';

const TrackOrderPage = () => {
  const t = useTranslations('track');
  const tCommon = useTranslations('common');
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock order data
  const mockOrderData = {
    orderNumber: 'INB-2024-001234',
    status: 'shipped',
    estimatedDelivery: '2024-10-05',
    totalAmount: '450,000',
    items: [
      { name: 'Bolalar kiyimi', quantity: 2, price: '200,000' },
      { name: 'O\'yinchoq mashina', quantity: 1, price: '250,000' }
    ],
    timeline: [
      {
        status: 'confirmed',
        title: 'Buyurtma tasdiqlandi',
        description: 'Buyurtmangiz qabul qilindi va tasdiqlandi',
        date: '2024-10-01 10:30',
        completed: true
      },
      {
        status: 'processing',
        title: 'Tayyorlanmoqda',
        description: 'Mahsulotlar ombordan yig\'ilib, qadoqlanmoqda',
        date: '2024-10-01 14:20',
        completed: true
      },
      {
        status: 'shipped',
        title: 'Yo\'lga chiqarildi',
        description: 'Buyurtma kuryer xizmatiga topshirildi',
        date: '2024-10-02 09:15',
        completed: true
      },
      {
        status: 'out_for_delivery',
        title: 'Yetkazib berilmoqda',
        description: 'Kuryer sizning manzilingizga yo\'lda',
        date: '2024-10-03 08:00',
        completed: false
      },
      {
        status: 'delivered',
        title: 'Yetkazib berildi',
        description: 'Buyurtma muvaffaqiyatli yetkazib berildi',
        date: '',
        completed: false
      }
    ],
    shippingAddress: {
      name: 'Alisher Karimov',
      phone: '+998 90 123 45 67',
      address: 'Toshkent sh., Chilonzor t., 12-mavze, 34-uy'
    },
    courier: {
      name: 'Bobur Toshmatov',
      phone: '+998 91 234 56 78'
    }
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (orderNumber.toLowerCase().includes('inb')) {
        setOrderData(mockOrderData);
      } else {
        setOrderData(null);
      }
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'out_for_delivery': return 'text-orange-600 bg-orange-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Tasdiqlandi';
      case 'processing': return 'Tayyorlanmoqda';
      case 'shipped': return 'Yo\'lga chiqarildi';
      case 'out_for_delivery': return 'Yetkazib berilmoqda';
      case 'delivered': return 'Yetkazib berildi';
      default: return 'Noma\'lum';
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title') || 'Buyurtmani kuzatish'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle') || 'Buyurtma raqami va email manzil orqali buyurtmangizning holatini kuzatib boring.'}
            </p>
          </div>

          {/* Track Form */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleTrackOrder} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buyurtma raqami *
                  </label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Masalan: INB-2024-001234"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email manzil *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Qidirilmoqda...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Buyurtmani kuzatish
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Results */}
          {orderData && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Buyurtma #{orderData.orderNumber}
                    </h2>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderData.status)}`}>
                      {getStatusText(orderData.status)}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-sm text-gray-500">Kutilayotgan yetkazib berish</p>
                    <p className="text-lg font-semibold text-gray-900">{orderData.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Yetkazib berish manzili</h3>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{orderData.shippingAddress.name}</p>
                      <p>{orderData.shippingAddress.phone}</p>
                      <p>{orderData.shippingAddress.address}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Kuryer ma'lumotlari</h3>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{orderData.courier.name}</p>
                      <p className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {orderData.courier.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Buyurtma summasi</h3>
                    <p className="text-2xl font-bold text-indigo-600">{orderData.totalAmount} so'm</p>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Buyurtma holati</h3>
                <div className="space-y-6">
                  {orderData.timeline.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Clock className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.title}
                        </h4>
                        <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {step.description}
                        </p>
                        {step.date && (
                          <p className="text-xs text-gray-400 mt-1">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Buyurtma tarkibi</h3>
                <div className="space-y-4">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">Miqdor: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{item.price} so'm</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* No Results */}
          {orderData === null && orderNumber && !loading && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Buyurtma topilmadi
                </h3>
                <p className="text-gray-600 mb-6">
                  Kiritilgan ma'lumotlar bo'yicha buyurtma topilmadi. Buyurtma raqami va email manzilni tekshirib, qayta urinib ko'ring.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-gray-900 mb-2">Maslahatlar:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Buyurtma raqamini to'g'ri kiritganingizni tekshiring</li>
                    <li>• Buyurtma berganingizda ishlatgan email manzilni kiriting</li>
                    <li>• Buyurtma raqami odatda "INB-" bilan boshlanadi</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-16 bg-indigo-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {t('need_help') || 'Yordam kerakmi?'}
            </h2>
            <p className="text-indigo-100 mb-6">
              {t('help_description') || 'Buyurtmangizni kuzatishda muammo bo\'lsa, biz bilan bog\'laning'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold">
                <Phone className="w-5 h-5" />
                +998 71 123 45 67
              </div>
              <div className="flex items-center justify-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold">
                <Mail className="w-5 h-5" />
                orders@inbola.uz
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrackOrderPage;
