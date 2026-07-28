import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Lock, Moon, Sun } from 'lucide-react';
import axios from 'axios';
import API_URL from '../config/api';

function Login({ setUserRole, darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [itCredentials, setItCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmployeeLogin = () => {
    console.log('Employee login clicked');
    localStorage.setItem('userRole', 'employee');
    localStorage.setItem('userName', '');
    setUserRole('employee');
    console.log('Navigating to /tickets/new');
    navigate('/tickets/new');
  };

  const handleITLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting IT login with:', itCredentials);
      const response = await axios.post(`${API_URL}/api/auth/it-login`, itCredentials);
      console.log('IT login response:', response.data);
      localStorage.setItem('userRole', 'it');
      localStorage.setItem('userName', response.data.staff.name);
      localStorage.setItem('userId', response.data.staff.id);
      setUserRole('it');
      console.log('Navigating to /');
      navigate('/');
    } catch (error) {
      console.error('IT login error:', error);
      console.error('Error response:', error.response);
      setError(error.response?.data?.error || 'خطأ في تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <img src="/logo.png" alt="شعار الشركة" className="h-24 w-24 mx-auto mb-4 object-contain" />
            <h1 className={`text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              IT-Service-Desk
            </h1>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>نظام إدارة الخدمات</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-lg transition-all ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white shadow-lg text-gray-700 hover:bg-gray-100'}`}
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        {!selectedRole ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Employee Card */}
            <div
              onClick={handleEmployeeLogin}
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all hover:scale-105 border-4 border-transparent hover:border-blue-500"
            >
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-6 mb-6">
                  <User className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">دخول الموظف</h2>
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg">
                  دخول
                </button>
              </div>
            </div>

            {/* IT Staff Card */}
            <div
              onClick={() => setSelectedRole('it')}
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all hover:scale-105 border-4 border-transparent hover:border-purple-500"
            >
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-full p-6 mb-6">
                  <Shield className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">دخول قسم IT</h2>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg">
                  دخول
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <button
              onClick={() => setSelectedRole('')}
              className="text-purple-600 hover:text-purple-800 mb-6 flex items-center"
            >
              ← العودة
            </button>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-full p-6 mb-4">
                  <Lock className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">تسجيل دخول قسم IT</h2>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleITLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    اسم المستخدم
                  </label>
                  <input
                    type="text"
                    value={itCredentials.username}
                    onChange={(e) => setItCredentials({ ...itCredentials, username: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="أدخل اسم المستخدم"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    value={itCredentials.password}
                    onChange={(e) => setItCredentials({ ...itCredentials, password: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  بيانات الدخول الافتراضية:
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  ali / admin123 | yassin / admin123 | ali_abdul / admin123
                </p>
              </div>
            </div>
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
  );
}

export default Login;
