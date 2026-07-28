import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Bell, Shield, Palette, Globe, Database, Save, RefreshCw, Moon, Sun, ArrowRight } from 'lucide-react';

function Settings({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    },
    appearance: {
      theme: 'light',
      language: 'ar'
    },
    system: {
      maintenanceMode: false,
      debugMode: false,
      logRetention: 30
    }
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('تم حفظ الإعدادات بنجاح!');
    }, 1000);
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين الإعدادات؟')) {
      setSettings({
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        security: {
          twoFactor: false,
          sessionTimeout: 30,
          passwordExpiry: 90
        },
        appearance: {
          theme: 'light',
          language: 'ar'
        },
        system: {
          maintenanceMode: false,
          debugMode: false,
          logRetention: 30
        }
      });
    }
  };

  const toggleSetting = (section, key) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: !settings[section][key]
      }
    });
  };

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
                الإعدادات
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                إعدادات النظام والتفضيلات
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                إعادة تعيين
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
              </button>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notifications Settings */}
          <div className={`rounded-3xl shadow-2xl p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 rounded-xl p-3">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>الإشعارات</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>إشعارات البريد الإلكتروني</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>استلام إشعارات عبر البريد الإلكتروني</p>
                </div>
                <button
                  onClick={() => toggleSetting('notifications', 'email')}
                  className={`w-14 h-8 rounded-full transition-all ${settings.notifications.email ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-all ${settings.notifications.email ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>إشعارات الدفع</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>إشعارات فورية على الجهاز</p>
                </div>
                <button
                  onClick={() => toggleSetting('notifications', 'push')}
                  className={`w-14 h-8 rounded-full transition-all ${settings.notifications.push ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-all ${settings.notifications.push ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>إشعارات SMS</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>إشعارات عبر الرسائل النصية</p>
                </div>
                <button
                  onClick={() => toggleSetting('notifications', 'sms')}
                  className={`w-14 h-8 rounded-full transition-all ${settings.notifications.sms ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-all ${settings.notifications.sms ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className={`rounded-3xl shadow-2xl p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 rounded-xl p-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>الأمان</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>المصادقة الثنائية</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>تفعيل المصادقة الثنائية</p>
                </div>
                <button
                  onClick={() => toggleSetting('security', 'twoFactor')}
                  className={`w-14 h-8 rounded-full transition-all ${settings.security.twoFactor ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-all ${settings.security.twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div>
                <p className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>انتهاء الجلسة (دقائق)</p>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                  })}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-purple-200'}`}
                />
              </div>
              <div>
                <p className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>انتهاء صلاحية كلمة المرور (أيام)</p>
                <input
                  type="number"
                  value={settings.security.passwordExpiry}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, passwordExpiry: parseInt(e.target.value) }
                  })}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-purple-200'}`}
                />
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className={`rounded-3xl shadow-2xl p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 rounded-xl p-3">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>المظهر</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>الوضع</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDarkMode(false)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${!darkMode ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
                  >
                    <Sun className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                    <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-900'}`}>فاتح</p>
                  </button>
                  <button
                    onClick={() => setDarkMode(true)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${darkMode ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
                  >
                    <Moon className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                    <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-900'}`}>ليلي</p>
                  </button>
                </div>
              </div>
              <div>
                <p className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>اللغة</p>
                <select
                  value={settings.appearance.language}
                  onChange={(e) => setSettings({
                    ...settings,
                    appearance: { ...settings.appearance, language: e.target.value }
                  })}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-purple-200'}`}
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className={`rounded-3xl shadow-2xl p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-100 rounded-xl p-3">
                <Database className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>النظام</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>وضع الصيانة</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>تفعيل وضع الصيانة</p>
                </div>
                <button
                  onClick={() => toggleSetting('system', 'maintenanceMode')}
                  className={`w-14 h-8 rounded-full transition-all ${settings.system.maintenanceMode ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-all ${settings.system.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>وضع التصحيح</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>تفعيل وضع التصحيح</p>
                </div>
                <button
                  onClick={() => toggleSetting('system', 'debugMode')}
                  className={`w-14 h-8 rounded-full transition-all ${settings.system.debugMode ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-all ${settings.system.debugMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div>
                <p className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>احتفاظ السجلات (أيام)</p>
                <input
                  type="number"
                  value={settings.system.logRetention}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: { ...settings.system, logRetention: parseInt(e.target.value) }
                  })}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-purple-200'}`}
                />
              </div>
            </div>
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

export default Settings;
