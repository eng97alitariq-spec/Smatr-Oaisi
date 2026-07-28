import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Archive, Image as ImageIcon, ArrowRight } from 'lucide-react';
import API_URL from '../config/api';

function TicketList({ darkMode }) {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    company: '',
    archived: 'false'
  });

  useEffect(() => {
    // Read status from URL parameters
    const statusParam = searchParams.get('status');
    if (statusParam) {
      setFilters(prev => ({ ...prev, status: statusParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const fetchTickets = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.category) params.append('category', filters.category);
      if (filters.company) params.append('company', filters.company);
      if (filters.archived) params.append('archived', filters.archived);

      const response = await axios.get(`${API_URL}/api/tickets?${params}`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
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
          التذاكر
        </h2>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 ml-2 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900">تصفية التذاكر</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">الحالة</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">الكل</option>
              <option value="pending">قيد الانتظار</option>
              <option value="in-progress">قيد العمل</option>
              <option value="resolved">تم الحل</option>
              <option value="closed">مغلق</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">الأولوية</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">الكل</option>
              <option value="low">منخفض</option>
              <option value="medium">متوسط</option>
              <option value="high">عالي</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">التصنيف</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">الكل</option>
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
            <label className="block text-sm font-bold text-gray-700 mb-1">الشركة</label>
            <select
              value={filters.company}
              onChange={(e) => setFilters({ ...filters, company: e.target.value })}
              className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">الكل</option>
              <option value="smart oasis">Smart Oasis</option>
              <option value="rasep">RASEP</option>
              <option value="edk">EDK</option>
              <option value="bwe">BWE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">الأرشفة</label>
            <select
              value={filters.archived}
              onChange={(e) => setFilters({ ...filters, archived: e.target.value })}
              className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="false">غير مؤرشف</option>
              <option value="true">مؤرشف</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">لا توجد تذاكر</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <Link key={ticket.id} to={`/tickets/${ticket.id}`} className="block">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{ticket.title}</h3>
                      {ticket.image_path && (
                        <ImageIcon className="w-5 h-5 ml-2 text-purple-600" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ticket.description}</p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                      <span className="font-bold text-purple-600">#{ticket.id}</span>
                      <span>•</span>
                      <span className="font-medium">{ticket.employee_name}</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompanyColor(ticket.company)}`}>
                        {ticket.company}
                      </span>
                      <span>•</span>
                      <span>{new Date(ticket.created_at).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                      {getStatusLabel(ticket.status)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(ticket.priority)}`}>
                      {getPriorityLabel(ticket.priority)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(ticket.category)}`}>
                      {getCategoryLabel(ticket.category)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
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

export default TicketList;
