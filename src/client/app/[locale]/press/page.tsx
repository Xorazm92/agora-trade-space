"use client";
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { Calendar, Download, ExternalLink, Award, Users, TrendingUp } from 'lucide-react';

const PressPage = () => {
  const t = useTranslations('press');
  const tCommon = useTranslations('common');

  const pressReleases = [
    {
      id: 1,
      title: "Inbola Launches New Children's Safety Initiative",
      date: "2024-09-15",
      excerpt: "New safety standards and quality assurance program for all children's products on the platform.",
      downloadUrl: "/press/safety-initiative-2024.pdf"
    },
    {
      id: 2,
      title: "Inbola Expands to 5 New Cities in Uzbekistan",
      date: "2024-08-20",
      excerpt: "Rapid expansion brings quality children's products to families across the country.",
      downloadUrl: "/press/expansion-announcement.pdf"
    },
    {
      id: 3,
      title: "Partnership with Local Manufacturers Announced",
      date: "2024-07-10",
      excerpt: "Supporting local businesses while providing authentic Uzbek products for children.",
      downloadUrl: "/press/local-partnership.pdf"
    }
  ];

  const mediaKit = [
    {
      name: "Company Logo (PNG)",
      description: "High-resolution logo files in various formats",
      downloadUrl: "/media-kit/inbola-logo.zip"
    },
    {
      name: "Brand Guidelines",
      description: "Complete brand identity and usage guidelines",
      downloadUrl: "/media-kit/brand-guidelines.pdf"
    },
    {
      name: "Product Images",
      description: "High-quality product photography collection",
      downloadUrl: "/media-kit/product-images.zip"
    },
    {
      name: "Executive Photos",
      description: "Professional headshots of leadership team",
      downloadUrl: "/media-kit/executive-photos.zip"
    }
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "50,000+",
      label: "Happy Families"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "1,000+",
      label: "Quality Products"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "99%",
      label: "Customer Satisfaction"
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title') || 'Press & Media'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle') || 'Latest news, press releases, and media resources about Inbola.'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-8 text-center shadow-lg">
                <div className="text-indigo-600 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Press Releases */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('press_releases') || 'Press Releases'}
            </h2>
            <div className="space-y-6">
              {pressReleases.map((release) => (
                <div key={release.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {release.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {release.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {release.date}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        {t('download') || 'Download'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media Kit */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('media_kit') || 'Media Kit'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaKit.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    {t('download') || 'Download'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('media_contact') || 'Media Contact'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t('press_inquiries') || 'Press Inquiries'}
                </h3>
                <p className="text-gray-600 mb-1">Email: press@inbola.uz</p>
                <p className="text-gray-600 mb-4">Phone: +998 71 123 45 67</p>
                
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t('partnership_inquiries') || 'Partnership Inquiries'}
                </h3>
                <p className="text-gray-600 mb-1">Email: partnerships@inbola.uz</p>
                <p className="text-gray-600">Phone: +998 71 123 45 68</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t('general_info') || 'General Information'}
                </h3>
                <p className="text-gray-600 mb-4">
                  For general inquiries and customer support, please visit our contact page or email info@inbola.uz
                </p>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  {t('contact_page') || 'Contact Page'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PressPage;
