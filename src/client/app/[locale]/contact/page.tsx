"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title') || 'Contact Us'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle') || 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t('get_in_touch') || 'Get in Touch'}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">info@inbola.uz</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">{t('phone') || 'Phone'}</h3>
                      <p className="text-gray-600">+998 71 123 45 67</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">{t('address') || 'Address'}</h3>
                      <p className="text-gray-600">
                        Tashkent, Uzbekistan<br />
                        Amir Temur Street 108
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">{t('hours') || 'Business Hours'}</h3>
                      <p className="text-gray-600">
                        Mon - Fri: 9:00 AM - 6:00 PM<br />
                        Sat: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t('send_message') || 'Send us a Message'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('name') || 'Full Name'}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={t('name_placeholder') || 'Your full name'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={t('email_placeholder') || 'your.email@example.com'}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('subject') || 'Subject'}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={t('subject_placeholder') || 'What is this about?'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('message') || 'Message'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={t('message_placeholder') || 'Tell us more about your inquiry...'}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {t('send') || 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
