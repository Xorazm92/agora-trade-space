"use client";
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { Briefcase, MapPin, Clock, Users, Heart, Zap } from 'lucide-react';

const CareersPage = () => {
  const t = useTranslations('careers');
  const tCommon = useTranslations('common');

  const jobOpenings = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Tashkent, Uzbekistan",
      type: "Full-time",
      description: "Join our team to build amazing user experiences for our e-commerce platform."
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Tashkent, Uzbekistan",
      type: "Full-time",
      description: "Lead product strategy and development for our growing marketplace."
    },
    {
      id: 3,
      title: "Customer Support Specialist",
      department: "Support",
      location: "Remote",
      type: "Full-time",
      description: "Help our customers have the best shopping experience possible."
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Growth Opportunities",
      description: "Professional development and career advancement"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Great Team",
      description: "Work with talented and passionate colleagues"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Work-Life Balance",
      description: "Flexible working hours and remote work options"
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title') || 'Join Our Team'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle') || 'Help us build the future of e-commerce in Uzbekistan. We\'re looking for talented individuals who are passionate about creating amazing experiences.'}
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('why_join') || 'Why Join Inbola?'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="text-indigo-600 mb-4 flex justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Job Openings */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('open_positions') || 'Open Positions'}
            </h2>
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        {t('apply_now') || 'Apply Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-indigo-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {t('dont_see_fit') || 'Don\'t see a perfect fit?'}
            </h2>
            <p className="text-indigo-100 mb-6">
              {t('send_resume') || 'Send us your resume anyway! We\'re always looking for talented people to join our team.'}
            </p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('send_resume_button') || 'Send Resume'}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CareersPage;
