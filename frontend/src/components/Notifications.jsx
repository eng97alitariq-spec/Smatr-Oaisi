import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, X, Clock, AlertCircle, CheckCircle, Info, ArrowRight } from 'lucide-react';

function Notifications({ darkMode }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'ticket', title: 'تذكرة جديدة', message: 'تم إنشاء تذكرة جديدة بواسطة محمد أحمد', time: 'منذ 5 دقائق', read: false, icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-100' },
    { id: 2, type: 'status', title: 'تحديث الحالة', message: 'تم تغيير حالة التذكرة #123 إلى قيد العمل', time: 'منذ 15 دقيقة', read: false, icon: Info, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { id: 3, type: 'resolved', title: 'تم الحل', message: 'تم حل التذكرة #122 بنجاح', time: 'منذ ساعة', read: true, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
    { id: 4, type: 'assigned', title: 'تعيين تذكرة', message: 'تم تعيين التذكرة #121 إليك', time: 'منذ ساعتين', read: true, icon: Check, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { id: 5, type: 'priority', title: 'أولوية عالية', message: 'تذكرة ذات أولوية عالية تحتاج انتباه', time: 'منذ 3 ساعات', read: true, icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-100' },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 pb-24' : 'bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            <ArrowRight className="w-5 h-5" />
            العودة
          </button>
        </div>
        {/* Header */}
        <div className={`rounded-3xl shadow-2xl p-8 mb-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                الإشعارات
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {unreadCount > 0 ? `${unreadCount} إشعار غير مقروء` : 'جميع الإشعارات مقروءة'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                تحديد الكل كمقروء
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className={`rounded-3xl shadow-2xl p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>لا توجد إشعارات</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 rounded-2xl transition-all ${!notification.read ? (darkMode ? 'bg-gray-700 border-2 border-purple-500' : 'bg-purple-50 border-2 border-purple-200') : (darkMode ? 'bg-gray-700' : 'bg-gray-50')}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${notification.bgColor} rounded-xl p-3`}>
                      <notification.icon className={`w-6 h-6 ${notification.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{notification.title}</h3>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{notification.time}</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{notification.message}</p>
                    </div>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-all"
                          title="تحديد كمقروء"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                        title="حذف"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

export default Notifications;
