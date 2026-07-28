import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Ticket, TrendingUp, Clock, CheckCircle, Building2, Layers, ArrowRight } from 'lucide-react';
import API_URL from '../config/api';

function Dashboard({ darkMode }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'قيد الانتظار',
      'in-progress': 'قيد العمل',
      resolved: 'تم الحل',
      closed: 'مغلق'
    };
    return labels[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      low: 'منخفض',
      medium: 'متوسط',
      high: 'عالي'
    };
    return labels[priority] || priority;
  };

  const getCategoryColor = (category) => {
    const colors = {
      internet: 'bg-blue-100 text-blue-800',
      printers: 'bg-purple-100 text-purple-800',
      email: 'bg-cyan-100 text-cyan-800',
      hardware: 'bg-orange-100 text-orange-800',
      software: 'bg-pink-100 text-pink-800',
      maintenance: 'bg-green-100 text-green-800',
      network: 'bg-indigo-100 text-indigo-800',
      access: 'bg-red-100 text-red-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      internet: 'الإنترنت',
      printers: 'الطابعات',
      email: 'الإيميلات',
      hardware: 'الأجهزة',
      software: 'البرامج',
      maintenance: 'الصيانة',
      network: 'الشبكة',
      access: 'الصلاحيات',
      other: 'أخرى'
    };
    return labels[category] || category;
  };

  const getCompanyColor = (company) => {
    const colors = {
      'smart oasis': 'bg-emerald-100 text-emerald-800',
      'rasep': 'bg-blue-100 text-blue-800',
      'edk': 'bg-purple-100 text-purple-800',
      'bwe': 'bg-orange-100 text-orange-800'
    };
    return colors[company.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>;
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 ${darkMode ? 'text-white' : ''}`}>
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          <ArrowRight className="w-5 h-5" />
          العودة
        </button>
      </div>
      <div className="text-center mb-8">
        <img src="/logo.png" alt="شعار الشركة" className="h-20 w-20 mx-auto mb-4 object-contain" />
        <h2 className={`text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ${darkMode ? 'text-white' : ''}`}>
          لوحة التحكم
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Link to="/tickets" className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
          <div className="flex items-center">
            <Ticket className="w-12 h-12 ml-4" />
            <div>
              <p className="text-white/80 text-sm">إجمالي التذاكر</p>
              <p className="text-4xl font-bold">{stats?.total || 0}</p>
            </div>
          </div>
        </Link>

        <Link to="/tickets?status=pending" className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
          <div className="flex items-center">
            <Clock className="w-12 h-12 ml-4" />
            <div>
              <p className="text-white/80 text-sm">قيد الانتظار</p>
              <p className="text-4xl font-bold">
                {stats?.byStatus?.find(s => s.status === 'pending')?.count || 0}
              </p>
            </div>
          </div>
        </Link>

        <Link to="/tickets?status=in-progress" className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
          <div className="flex items-center">
            <TrendingUp className="w-12 h-12 ml-4" />
            <div>
              <p className="text-white/80 text-sm">قيد العمل</p>
              <p className="text-4xl font-bold">
                {stats?.byStatus?.find(s => s.status === 'in-progress')?.count || 0}
              </p>
            </div>
          </div>
        </Link>

        <Link to="/tickets?status=resolved" className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
          <div className="flex items-center">
            <CheckCircle className="w-12 h-12 ml-4" />
            <div>
              <p className="text-white/80 text-sm">تم الحل</p>
              <p className="text-4xl font-bold">
                {stats?.byStatus?.find(s => s.status === 'resolved')?.count || 0}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Layers className="w-6 h-6 ml-2 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">حالة التذاكر</h3>
          </div>
          <div className="space-y-3">
            {stats?.byStatus?.map((item) => (
              <div key={item.status} className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                  {getStatusLabel(item.status)}
                </span>
                <span className="font-bold text-gray-900 text-lg">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 ml-2 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">الأولوية</h3>
          </div>
          <div className="space-y-3">
            {stats?.byPriority?.map((item) => (
              <div key={item.priority} className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(item.priority)}`}>
                  {getPriorityLabel(item.priority)}
                </span>
                <span className="font-bold text-gray-900 text-lg">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Ticket className="w-6 h-6 ml-2 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">التصنيف</h3>
          </div>
          <div className="space-y-3">
            {stats?.byCategory?.map((item) => (
              <div key={item.category} className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                  {getCategoryLabel(item.category)}
                </span>
                <span className="font-bold text-gray-900 text-lg">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Building2 className="w-6 h-6 ml-2 text-orange-600" />
            <h3 className="text-xl font-bold text-gray-900">الشركات</h3>
          </div>
          <div className="space-y-3">
            {stats?.byCompany?.map((item) => (
              <div key={item.company} className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompanyColor(item.company)}`}>
                  {item.company}
                </span>
                <span className="font-bold text-gray-900 text-lg">{item.count}</span>
              </div>
            ))}
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
  );
}

export default Dashboard;
