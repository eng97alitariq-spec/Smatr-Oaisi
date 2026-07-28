import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Ticket, FileText, PlusCircle, BarChart3, Settings, Users, Bell } from 'lucide-react';

function Home({ userRole, darkMode }) {
  const navigate = useNavigate();

  if (userRole !== 'it') {
    return null;
  }

  const handleQuickAction = (action) => {
    switch(action) {
      case 'stats':
        navigate('/dashboard');
        break;
      case 'users':
        navigate('/users');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        break;
    }
  };

  const cards = [
    {
      title: 'لوحة التحكم',
      description: 'عرض الإحصائيات والملخص العام',
      icon: LayoutDashboard,
      color: 'from-purple-500 to-purple-600',
      link: '/dashboard',
      stats: 'إحصائيات'
    },
    {
      title: 'التذاكر',
      description: 'إدارة ومتابعة جميع التذاكر',
      icon: Ticket,
      color: 'from-blue-500 to-blue-600',
      link: '/tickets',
      stats: 'إدارة'
    },
    {
      title: 'التقارير',
      description: 'تقارير مفصلة وتصدير البيانات',
      icon: FileText,
      color: 'from-cyan-500 to-cyan-600',
      link: '/reports',
      stats: 'تحليل'
    },
    {
      title: 'طلب جديد',
      description: 'إنشاء طلب خدمة جديد',
      icon: PlusCircle,
      color: 'from-emerald-500 to-emerald-600',
      link: '/tickets/new',
      stats: 'إنشاء'
    }
  ];

  const quickActions = [
    {
      title: 'إحصائيات سريعة',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      action: 'stats'
    },
    {
      title: 'إدارة المستخدمين',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      action: 'users'
    },
    {
      title: 'الإشعارات',
      icon: Bell,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      action: 'notifications'
    },
    {
      title: 'الإعدادات',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      action: 'settings'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className={`rounded-3xl shadow-2xl p-8 mb-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                مرحباً بك في نظام إدارة الخدمات
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                محطة ميسان الغازية - Smart Oasis
              </p>
            </div>
            <img src="/logo.png" alt="شعار الشركة" className="h-24 w-24 object-contain" />
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="group"
            >
              <div className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <div className="bg-white/20 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-4 backdrop-blur-sm">
                    <card.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white/90 text-sm mb-4">{card.description}</p>
                  <div className="flex items-center text-sm font-medium">
                    <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {card.stats}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className={`rounded-3xl shadow-2xl p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            إجراءات سريعة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className={`${action.bgColor} rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105`}
              >
                <action.icon className={`w-8 h-8 ${action.color} mb-3`} />
                <p className={`font-bold ${darkMode ? 'text-gray-800' : 'text-gray-900'}`}>{action.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-3 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-medium">
              ✨ نظام إدارة الخدمات - محطة ميسان الغازية | صمم بواسطة: علي طارق عنيد - مسؤول قسم IT Operations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
