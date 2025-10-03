"use client";
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

const BlogPage = () => {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');

  const blogPosts = [
    {
      id: 1,
      title: "Bolalar uchun xavfsiz o'yinchoqlar tanlash",
      excerpt: "Bolangiz uchun eng xavfsiz va foydali o'yinchoqlarni qanday tanlash haqida maslahatlar.",
      author: "Inbola Team",
      date: "2024-10-01",
      category: "Parenting Tips",
      image: "/blog/toy-safety.jpg",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Yangi mahsulotlar: Kuz kolleksiyasi",
      excerpt: "Kuz faslida bolalar uchun yangi kiyim va aksessuarlar kolleksiyasi bilan tanishing.",
      author: "Fashion Team",
      date: "2024-09-28",
      category: "New Products",
      image: "/blog/autumn-collection.jpg",
      readTime: "3 min"
    },
    {
      id: 3,
      title: "Bolalar rivojlanishi uchun kitoblar",
      excerpt: "Har xil yoshdagi bolalar uchun eng yaxshi rivojlantiruvchi kitoblar ro'yxati.",
      author: "Education Team",
      date: "2024-09-25",
      category: "Education",
      image: "/blog/children-books.jpg",
      readTime: "7 min"
    },
    {
      id: 4,
      title: "Onlayn xarid qilishda xavfsizlik",
      excerpt: "Onlayn do'konlarda xavfsiz xarid qilish uchun muhim maslahatlar va qoidalar.",
      author: "Security Team",
      date: "2024-09-20",
      category: "Safety",
      image: "/blog/online-safety.jpg",
      readTime: "4 min"
    }
  ];

  const categories = [
    "All Posts",
    "Parenting Tips", 
    "New Products",
    "Education",
    "Safety",
    "Reviews"
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title') || 'Inbola Blog'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle') || 'Parenting tips, product reviews, and everything you need to know about children\'s products.'}
            </p>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                      <h3 className="text-2xl font-bold mb-2">Featured Article</h3>
                      <p className="text-indigo-100">Latest insights and tips</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Tag className="w-4 h-4" />
                    <span>{blogPosts[0].category}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {blogPosts[0].author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blogPosts[0].date}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${blogPosts[0].id}`}
                      className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                    >
                      {t('read_more') || 'Read More'}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-sm">Blog Image</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Tag className="w-4 h-4" />
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    {t('read_more') || 'Read More'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-indigo-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {t('newsletter_title') || 'Stay Updated'}
            </h2>
            <p className="text-indigo-100 mb-6">
              {t('newsletter_description') || 'Subscribe to our newsletter to get the latest parenting tips and product updates.'}
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder={t('email_placeholder') || 'Your email address'}
                className="flex-1 px-4 py-2 rounded-lg text-gray-900"
              />
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {t('subscribe') || 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPage;
