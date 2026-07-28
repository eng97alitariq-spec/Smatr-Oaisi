import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload, Image as ImageIcon, LogOut, ArrowRight } from 'lucide-react';
import API_URL from '../config/api';

function CreateTicket({ darkMode }) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [formData, setFormData] = useState({
    employee_name: '',
    company: 'smart oasis',
    title: '',
    description: '',
    category: 'internet',
    priority: 'medium'
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const IT_STAFF = [
    'علي طارق',
    'ياسين رعد',
    'علي عبد الأمير'
  ];

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== Starting ticket submission ===');
    setLoading(true);

    console.log('Form data being submitted:', formData);
    console.log('Image:', image);
    console.log('Form validation:', {
      hasEmployeeName: !!formData.employee_name,
      hasCompany: !!formData.company,
      hasTitle: !!formData.title,
      hasDescription: !!formData.description,
      hasCategory: !!formData.category
    });

    if (!formData.employee_name || !formData.company || !formData.title || !formData.description || !formData.category) {
      console.error('Validation failed: Missing required fields');
      alert('يرجى ملء جميع الحقول المطلوبة');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('employee_name', formData.employee_name);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('priority', formData.priority);
      if (image) {
        formDataToSend.append('image', image);
      }

      console.log('FormData entries:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      console.log('Sending request to backend...');
      console.log('Request URL:', `${API_URL}/api/tickets`);
      
      const response = await axios.post(`${API_URL}/api/tickets`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      console.log('Response received:', response.data);
      console.log('Response status:', response.status);
      navigate('/tickets');
    } catch (error) {
      console.error('=== Error creating ticket ===');
      console.error('Error object:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      
      const errorMessage = error.response?.data?.error || error.message || 'خطأ غير معروف';
      alert('حدث خطأ أثناء إنشاء التذكرة: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 pb-24' : 'bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-24'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <div className="text-center">
            <img src="/logo.png" alt="شعار الشركة" className="h-24 w-24 mx-auto mb-4 object-contain" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              إرسال طلب
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>نظام إدارة الخدمات - Smart Oasis</p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>محطة ميسان الغازية</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee Info */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border-2 border-purple-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-2 ml-3">
                  👤
                </span>
                معلومات الموظف
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    اسم الموظف *
                  </label>
                  <input
                    type="text"
                    name="employee_name"
                    value={formData.employee_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="أدخل اسم الموظف"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الشركة *
                  </label>
                  <select
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="smart oasis">Smart Oasis</option>
                    <option value="rasep">RASEP</option>
                    <option value="edk">EDK</option>
                    <option value="bwe">BWE</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl p-2 ml-3">
                  📝
                </span>
                تفاصيل الطلب
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    عنوان الطلب *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="أدخل عنوان الطلب"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    وصف المشكلة *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows={6}
                    placeholder="صف المشكلة بالتفصيل"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Category & Priority */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl p-2 ml-3">
                  ⚙️
                </span>
                تصنيف الطلب
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    قسم الطلب *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="internet">الإنترنت</option>
                    <option value="printers">الطابعات</option>
                    <option value="email">الإيميلات</option>
                    <option value="hardware">الأجهزة</option>
                    <option value="software">البرامج</option>
                    <option value="maintenance">الصيانة</option>
                    <option value="network">الشبكة</option>
                    <option value="access">الصلاحيات</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الأولوية *
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="low">منخفض</option>
                    <option value="medium">متوسط</option>
                    <option value="high">عالي</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl p-2 ml-3">
                  📷
                </span>
                إرفاق صورة (اختياري)
              </h3>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-emerald-300 rounded-2xl hover:border-emerald-400 transition-all bg-white">
                <div className="space-y-2 text-center">
                  <ImageIcon className="mx-auto h-16 w-16 text-emerald-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl px-4 py-2 font-medium hover:from-emerald-600 hover:to-green-600 transition-all">
                      <span>رفع صورة</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">أو سحب وإفلات</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 5MB</p>
                  {image && (
                    <div className="mt-4 bg-emerald-100 rounded-xl p-3">
                      <p className="text-sm text-emerald-700 font-medium">
                        ✅ تم اختيار: {image.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 space-x-reverse">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? '⏳ جاري الإرسال...' : '✨ إرسال الطلب'}
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-gray-200 text-gray-800 rounded-2xl font-bold hover:bg-gray-300 transition-all text-lg"
              >
                🔄 إعادة تعيين
              </button>
            </div>
          </form>
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

export default CreateTicket;
