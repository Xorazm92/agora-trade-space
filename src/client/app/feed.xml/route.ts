import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://inbola.uz' : 'http://localhost:3000'
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Inbola - Bolalar uchun eng yaxshi tanlov</title>
    <description>O'zbekistondagi eng yirik bolalar do'koni. 0-12 yosh bolalar uchun sifatli va xavfsiz mahsulotlar.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>uz-UZ</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Inbola</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    
    <item>
      <title>Yangi mahsulotlar kolleksiyasi</title>
      <description>Bolalar uchun yangi va qiziqarli mahsulotlar kolleksiyasi. O'yinchoqlar, kiyimlar va boshqa mahsulotlar.</description>
      <link>${baseUrl}/uz/shop?isNew=true</link>
      <guid>${baseUrl}/uz/shop?isNew=true</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>Yangi mahsulotlar</category>
    </item>
    
    <item>
      <title>Mashhur o'yinchoqlar</title>
      <description>Eng mashhur va sevimli o'yinchoqlar to'plami. Bolalar uchun xavfsiz va ta'limiy o'yinchoqlar.</description>
      <link>${baseUrl}/uz/categories/oyinchoqlar</link>
      <guid>${baseUrl}/uz/categories/oyinchoqlar</guid>
      <pubDate>${new Date(Date.now() - 24 * 60 * 60 * 1000).toUTCString()}</pubDate>
      <category>O'yinchoqlar</category>
    </item>
    
    <item>
      <title>Bolalar kiyimlari kolleksiyasi</title>
      <description>Har fasl uchun mos bolalar kiyimlari. Sifatli va qulay kiyimlar barcha yoshdagi bolalar uchun.</description>
      <link>${baseUrl}/uz/categories/bolalar-kiyimlari</link>
      <guid>${baseUrl}/uz/categories/bolalar-kiyimlari</guid>
      <pubDate>${new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toUTCString()}</pubDate>
      <category>Bolalar kiyimlari</category>
    </item>
    
    <item>
      <title>Chaqaloq mahsulotlari</title>
      <description>Yangi tug'ilgan chaqaloqlar uchun zarur bo'lgan barcha mahsulotlar. Xavfsiz va sifatli chaqaloq mahsulotlari.</description>
      <link>${baseUrl}/uz/categories/chaqaloq-mahsulotlari</link>
      <guid>${baseUrl}/uz/categories/chaqaloq-mahsulotlari</guid>
      <pubDate>${new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toUTCString()}</pubDate>
      <category>Chaqaloq mahsulotlari</category>
    </item>
    
    <item>
      <title>Bolalar kitoblari</title>
      <description>Ta'limiy va qiziqarli bolalar kitoblari. Har xil yoshdagi bolalar uchun mos kitoblar to'plami.</description>
      <link>${baseUrl}/uz/categories/bolalar-kitoblari</link>
      <guid>${baseUrl}/uz/categories/bolalar-kitoblari</guid>
      <pubDate>${new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toUTCString()}</pubDate>
      <category>Bolalar kitoblari</category>
    </item>
    
  </channel>
</rss>`

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
