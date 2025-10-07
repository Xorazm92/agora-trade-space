import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maxfiylik siyosati - Inbola',
  description: 'Inbola maxfiylik siyosati va shaxsiy ma\'lumotlarni himoya qilish',
};

export default function PrivacyPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Maxfiylik siyosati
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Ma'lumotlar to'plash
              </h2>
              <p className="text-gray-600 mb-4">
                Biz sizning shaxsiy ma'lumotlaringizni faqat xizmatlarimizni yaxshilash va 
                sizga eng yaxshi tajribani taqdim etish uchun to'playmiz.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Ism va familiya</li>
                <li>Email manzil</li>
                <li>Telefon raqami</li>
                <li>Yetkazib berish manzili</li>
                <li>To'lov ma'lumotlari (xavfsiz tarzda)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Ma'lumotlardan foydalanish
              </h2>
              <p className="text-gray-600 mb-4">
                Sizning ma'lumotlaringiz quyidagi maqsadlarda ishlatiladi:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Buyurtmalarni qayta ishlash va yetkazib berish</li>
                <li>Mijozlar bilan aloqa o'rnatish</li>
                <li>Xizmat sifatini yaxshilash</li>
                <li>Marketing va reklama (rozilik asosida)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. Ma'lumotlar xavfsizligi
              </h2>
              <p className="text-gray-600 mb-4">
                Biz sizning shaxsiy ma'lumotlaringizni himoya qilish uchun zamonaviy 
                xavfsizlik choralarini qo'llaymiz:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>SSL shifrlash</li>
                <li>Xavfsiz serverlar</li>
                <li>Muntazam xavfsizlik tekshiruvlari</li>
                <li>Cheklangan kirish huquqlari</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Cookie'lar
              </h2>
              <p className="text-gray-600 mb-4">
                Saytimiz cookie'lardan foydalanib, sizning tajribangizni yaxshilaydi. 
                Cookie'lar quyidagi maqsadlarda ishlatiladi:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Sayt funksionalligini ta'minlash</li>
                <li>Foydalanuvchi sozlamalarini saqlash</li>
                <li>Sayt statistikasini to'plash</li>
                <li>Reklama samaradorligini o'lchash</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Sizning huquqlaringiz
              </h2>
              <p className="text-gray-600 mb-4">
                Sizda quyidagi huquqlar mavjud:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Ma'lumotlaringizni ko'rish va yangilash</li>
                <li>Ma'lumotlaringizni o'chirish talab qilish</li>
                <li>Marketing xabarlardan voz kechish</li>
                <li>Ma'lumotlar qayta ishlanishiga e'tiroz bildirish</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Aloqa
              </h2>
              <p className="text-gray-600 mb-4">
                Maxfiylik siyosati bo'yicha savollaringiz bo'lsa, biz bilan bog'laning:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>Email:</strong> privacy@inbola.uz<br />
                  <strong>Telefon:</strong> +998 71 123 45 67<br />
                  <strong>Manzil:</strong> Toshkent sh., Chilonzor tumani
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. O'zgarishlar
              </h2>
              <p className="text-gray-600">
                Ushbu maxfiylik siyosati vaqti-vaqti bilan yangilanishi mumkin. 
                Barcha o'zgarishlar ushbu sahifada e'lon qilinadi.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Oxirgi yangilanish: {new Date().toLocaleDateString('uz-UZ')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
