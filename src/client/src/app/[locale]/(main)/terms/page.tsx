import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foydalanish shartlari - Inbola',
  description: 'Inbola platformasidan foydalanish shartlari va qoidalari',
};

export default function TermsPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Foydalanish shartlari
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Umumiy qoidalar
              </h2>
              <p className="text-gray-600 mb-4">
                Inbola.uz saytidan foydalanish orqali siz ushbu shartlarni to'liq 
                qabul qilasiz va ularga rioya qilishga majbursiz.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Saytdan faqat qonuniy maqsadlarda foydalaning</li>
                <li>Boshqa foydalanuvchilarning huquqlarini hurmat qiling</li>
                <li>Noto'g'ri ma'lumotlar bermaslik</li>
                <li>Sayt xavfsizligini buzmaslik</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Hisob qaydnomasi
              </h2>
              <p className="text-gray-600 mb-4">
                Saytdan to'liq foydalanish uchun hisob qaydnomasi yaratishingiz kerak:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>To'g'ri va dolzarb ma'lumotlar berish</li>
                <li>Parolni maxfiy saqlash</li>
                <li>Hisobingiz xavfsizligiga javobgarlik</li>
                <li>Shubhali faoliyat haqida xabar berish</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. Buyurtmalar va to'lovlar
              </h2>
              <p className="text-gray-600 mb-4">
                Buyurtma berish va to'lov qilish jarayoni:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Barcha narxlar O'zbekiston so'mida ko'rsatilgan</li>
                <li>To'lov xavfsiz tizimlar orqali amalga oshiriladi</li>
                <li>Buyurtma tasdiqlangandan keyin o'zgartirib bo'lmaydi</li>
                <li>Yetkazib berish muddatlari taxminiy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Qaytarish va almashtirish
              </h2>
              <p className="text-gray-600 mb-4">
                Mahsulotlarni qaytarish va almashtirish shartlari:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>14 kun ichida qaytarish mumkin</li>
                <li>Mahsulot asl holatida bo'lishi kerak</li>
                <li>Chek yoki buyurtma raqami talab qilinadi</li>
                <li>Ba'zi mahsulotlar qaytarilmaydi (gigiyena mahsulotlari)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Intellektual mulk
              </h2>
              <p className="text-gray-600 mb-4">
                Saytdagi barcha kontent himoyalangan:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Matnlar, rasmlar, videolar</li>
                <li>Dizayn va interfeys</li>
                <li>Brend va logotiplar</li>
                <li>Dasturiy ta'minot</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Javobgarlik cheklash
              </h2>
              <p className="text-gray-600 mb-4">
                Inbola quyidagi holatlarda javobgar emas:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Uchinchi tomon xizmatlari</li>
                <li>Texnik nosozliklar</li>
                <li>Foydalanuvchi xatolari</li>
                <li>Boshqarilmagan holatlar</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Nizolarni hal qilish
              </h2>
              <p className="text-gray-600 mb-4">
                Nizolar quyidagi tartibda hal qilinadi:
              </p>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Mijozlar xizmati bilan murojaat</li>
                <li>Yozma shikoyat berish</li>
                <li>Muzokaralar o'tkazish</li>
                <li>Sud tartibida hal qilish</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. Aloqa ma'lumotlari
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>Email:</strong> support@inbola.uz<br />
                  <strong>Telefon:</strong> +998 71 123 45 67<br />
                  <strong>Manzil:</strong> Toshkent sh., Chilonzor tumani<br />
                  <strong>Ish vaqti:</strong> Dushanba-Yakshanba 9:00-21:00
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. Yakuniy qoidalar
              </h2>
              <p className="text-gray-600 mb-4">
                Ushbu shartlar O'zbekiston Respublikasi qonunlariga muvofiq tuzilgan. 
                Shartlar vaqti-vaqti bilan yangilanishi mumkin.
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
