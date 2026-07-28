import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Download, Filter, FileText, Calendar, User, Building2, ArrowRight } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import API_URL from '../config/api';

function Reports({ darkMode }) {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    assigned_to: '',
    company: '',
    category: '',
    status: ''
  });

  const IT_STAFF = [
    'علي طارق',
    'ياسين رعد',
    'علي عبد الأمير'
  ];

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [filters, tickets]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tickets`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTickets = () => {
    let filtered = [...tickets];

    if (filters.startDate) {
      filtered = filtered.filter(t => new Date(t.created_at) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      filtered = filtered.filter(t => new Date(t.created_at) <= new Date(filters.endDate));
    }
    if (filters.assigned_to) {
      filtered = filtered.filter(t => t.assigned_to === filters.assigned_to);
    }
    if (filters.company) {
      filtered = filtered.filter(t => t.company === filters.company);
    }
    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category);
    }
    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    setFilteredTickets(filtered);
  };

  const exportToPDF = () => {
    const element = document.createElement('div');
    element.style.padding = '30px';
    element.style.fontFamily = 'Arial, sans-serif';
    element.style.direction = 'rtl';
    element.style.backgroundColor = '#ffffff';
    
    element.innerHTML = `
      <div style="background: linear-gradient(135deg, #7C3AED 0%, #2563EB 50%, #0891B2 100%); padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
        <h1 style="color: white; font-size: 28px; margin: 0 0 8px 0; font-weight: bold;">تقرير تذاكر IT</h1>
        <p style="color: rgba(255,255,255,0.95); font-size: 16px; margin: 0 0 5px 0;">Smart Oasis - نظام إدارة الخدمات</p>
        <p style="color: rgba(255,255,255,0.85); font-size: 13px; margin: 0 0 5px 0;">صمم بواسطة: علي طارق عنيد - IT Operations Manager</p>
        <p style="color: rgba(255,255,255,0.75); font-size: 11px; margin: 8px 0 0 0;">تاريخ التقرير: ${new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      
      ${(filters.startDate || filters.endDate || filters.assigned_to || filters.company) ? `
        <div style="background: #FEF3C7; padding: 15px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid #F59E0B;">
          <h3 style="color: #92400E; font-size: 14px; margin: 0 0 8px 0; font-weight: bold;">الفلاتر المطبقة:</h3>
          <p style="color: #78350F; font-size: 13px; margin: 0; line-height: 1.6;">
            ${filters.startDate || filters.endDate ? `📅 الفترة: ${filters.startDate || 'البدء'} - ${filters.endDate || 'النهاية'}` : ''}
            ${filters.assigned_to ? `<br>👤 الموظف: ${filters.assigned_to}` : ''}
            ${filters.company ? `<br>🏢 الشركة: ${filters.company}` : ''}
          </p>
        </div>
      ` : ''}
      
      <div style="background: white; border: 2px solid #E5E7EB; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
        <h2 style="background: linear-gradient(135deg, #7C3AED 0%, #2563EB 100%); color: white; font-size: 16px; margin: -20px -20px 15px -20px; padding: 12px 20px; border-radius: 10px 10px 0 0; font-weight: bold;">ملخص التقرير</h2>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
          <div style="background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%); padding: 12px; border-radius: 8px; color: white; text-align: center;">
            <p style="margin: 0; font-size: 12px; opacity: 0.9;">إجمالي التذاكر</p>
            <p style="margin: 4px 0 0 0; font-size: 22px; font-weight: bold;">${filteredTickets.length}</p>
          </div>
          <div style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 12px; border-radius: 8px; color: white; text-align: center;">
            <p style="margin: 0; font-size: 12px; opacity: 0.9;">قيد الانتظار</p>
            <p style="margin: 4px 0 0 0; font-size: 22px; font-weight: bold;">${filteredTickets.filter(t => t.status === 'pending').length}</p>
          </div>
          <div style="background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); padding: 12px; border-radius: 8px; color: white; text-align: center;">
            <p style="margin: 0; font-size: 12px; opacity: 0.9;">قيد العمل</p>
            <p style="margin: 4px 0 0 0; font-size: 22px; font-weight: bold;">${filteredTickets.filter(t => t.status === 'in-progress').length}</p>
          </div>
          <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 12px; border-radius: 8px; color: white; text-align: center;">
            <p style="margin: 0; font-size: 12px; opacity: 0.9;">تم الحل</p>
            <p style="margin: 4px 0 0 0; font-size: 22px; font-weight: bold;">${filteredTickets.filter(t => t.status === 'resolved').length}</p>
          </div>
        </div>
      </div>
      
      <div style="background: white; border: 2px solid #E5E7EB; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
        <h2 style="background: linear-gradient(135deg, #7C3AED 0%, #2563EB 100%); color: white; font-size: 16px; margin: -20px -20px 15px -20px; padding: 12px 20px; border-radius: 10px 10px 0 0; font-weight: bold;">ملخص حسب موظفي IT</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
          ${IT_STAFF.map(staff => `
            <div style="background: #F3E8FF; padding: 12px; border-radius: 8px; border: 2px solid #7C3AED; text-align: center;">
              <p style="margin: 0; font-size: 13px; font-weight: bold; color: #4C1D95;">${staff}</p>
              <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: bold; color: #7C3AED;">${filteredTickets.filter(t => t.assigned_to === staff).length}</p>
              <p style="margin: 2px 0 0 0; font-size: 11px; color: #6B7280;">تذكرة</p>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div style="background: white; border: 2px solid #E5E7EB; border-radius: 12px; padding: 20px;">
        <h2 style="background: linear-gradient(135deg, #7C3AED 0%, #2563EB 100%); color: white; font-size: 16px; margin: -20px -20px 15px -20px; padding: 12px 20px; border-radius: 10px 10px 0 0; font-weight: bold;">قائمة التذاكر</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
          <thead>
            <tr style="background: linear-gradient(135deg, #7C3AED 0%, #2563EB 100%); color: white;">
              <th style="padding: 10px 8px; text-align: right; font-weight: bold;">#</th>
              <th style="padding: 10px 8px; text-align: right; font-weight: bold;">العنوان</th>
              <th style="padding: 10px 8px; text-align: right; font-weight: bold;">الموظف</th>
              <th style="padding: 10px 8px; text-align: right; font-weight: bold;">الشركة</th>
              <th style="padding: 10px 8px; text-align: right; font-weight: bold;">القسم</th>
              <th style="padding: 10px 8px; text-align: right; font-weight: bold;">الأولوية</th>
              <th style="padding: 10px 8px; text-align: right; font-weight: bold;">الحالة</th>
              <th style="padding: 10px 8px; text-align: right; font-weight: bold;">المعين لـ</th>
              <th style="padding: 10px 8px; text-align: right; font-weight: bold;">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            ${filteredTickets.map((ticket, index) => `
              <tr style="background-color: ${index % 2 === 0 ? '#F9FAFB' : '#F3F4F6'};">
                <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #7C3AED;">#${ticket.id}</td>
                <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">${ticket.title}</td>
                <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${ticket.employee_name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${ticket.company}</td>
                <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${ticket.category}</td>
                <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">
                  <span style="background: ${ticket.priority === 'high' ? '#FEE2E2' : ticket.priority === 'medium' ? '#FEF3C7' : '#D1FAE5'}; color: ${ticket.priority === 'high' ? '#DC2626' : ticket.priority === 'medium' ? '#D97706' : '#059669'}; padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: bold;">
                    ${ticket.priority === 'high' ? 'عالي' : ticket.priority === 'medium' ? 'متوسط' : 'منخفض'}
                  </span>
                </td>
                <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">
                  <span style="background: ${ticket.status === 'pending' ? '#FEF3C7' : ticket.status === 'in-progress' ? '#DBEAFE' : ticket.status === 'resolved' ? '#D1FAE5' : '#F3F4F6'}; color: ${ticket.status === 'pending' ? '#D97706' : ticket.status === 'in-progress' ? '#2563EB' : ticket.status === 'resolved' ? '#059669' : '#4B5563'}; padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: bold;">
                    ${ticket.status === 'pending' ? 'قيد الانتظار' : ticket.status === 'in-progress' ? 'قيد العمل' : ticket.status === 'resolved' ? 'تم الحل' : 'مغلق'}
                  </span>
                </td>
                <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${ticket.assigned_to || 'غير معين'}</td>
                <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${new Date(ticket.created_at).toLocaleDateString('ar-EG')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div style="margin-top: 25px; text-align: center; color: #6B7280; font-size: 10px; border-top: 1px solid #E5E7EB; padding-top: 15px;">
        <p style="margin: 0 0 5px 0;">تم إنشاء هذا التقرير بواسطة نظام تذاكر IT - Smart Oasis</p>
        <p style="margin: 0;">جميع الحقوق محفوظة © ${new Date().getFullYear()}</p>
      </div>
    `;

    const opt = {
      margin: 10,
      filename: `تقرير-IT-${new Date().toLocaleDateString('ar-EG')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 pb-24' : 'bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              مركز التقارير والإحصائيات
            </h1>
            <p className="text-gray-600 text-lg">نظام إدارة الخدمات - Smart Oasis</p>
            <p className="text-sm text-gray-500 mt-1">محطة ميسان الغازية</p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={exportToPDF}
              className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 transform hover:scale-105"
            >
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              <span>تصدير تقرير PDF</span>
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-purple-100">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-3 ml-4">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">تصفية البيانات</h3>
              <p className="text-gray-500 text-sm">حدد المعايير لتصفية التقرير</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 ml-2 text-purple-600" />
                من تاريخ
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-purple-400"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 ml-2 text-purple-600" />
                إلى تاريخ
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-purple-400"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <User className="w-4 h-4 ml-2 text-purple-600" />
                موظف IT
              </label>
              <select
                value={filters.assigned_to}
                onChange={(e) => setFilters({ ...filters, assigned_to: e.target.value })}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-purple-400"
              >
                <option value="">الكل</option>
                {IT_STAFF.map(staff => (
                  <option key={staff} value={staff}>{staff}</option>
                ))}
              </select>
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <Building2 className="w-4 h-4 ml-2 text-purple-600" />
                الشركة
              </label>
              <select
                value={filters.company}
                onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-purple-400"
              >
                <option value="">الكل</option>
                <option value="smart oasis">Smart Oasis</option>
                <option value="rasep">RASEP</option>
                <option value="edk">EDK</option>
                <option value="bwe">BWE</option>
              </select>
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <FileText className="w-4 h-4 ml-2 text-purple-600" />
                القسم
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-purple-400"
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
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <FileText className="w-4 h-4 ml-2 text-purple-600" />
                الحالة
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-purple-400"
              >
                <option value="">الكل</option>
                <option value="pending">قيد الانتظار</option>
                <option value="in-progress">قيد العمل</option>
                <option value="resolved">تم الحل</option>
                <option value="closed">مغلق</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all border border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">إجمالي التذاكر</p>
                <p className="text-5xl font-bold">{filteredTickets.length}</p>
              </div>
              <div className="bg-white/20 rounded-2xl p-4">
                <FileText className="w-12 h-12" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all border border-amber-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">قيد الانتظار</p>
                <p className="text-5xl font-bold">{filteredTickets.filter(t => t.status === 'pending').length}</p>
              </div>
              <div className="bg-white/20 rounded-2xl p-4">
                <User className="w-12 h-12" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all border border-blue-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">قيد العمل</p>
                <p className="text-5xl font-bold">{filteredTickets.filter(t => t.status === 'in-progress').length}</p>
              </div>
              <div className="bg-white/20 rounded-2xl p-4">
                <Calendar className="w-12 h-12" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all border border-emerald-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">تم الحل</p>
                <p className="text-5xl font-bold">{filteredTickets.filter(t => t.status === 'resolved').length}</p>
              </div>
              <div className="bg-white/20 rounded-2xl p-4">
                <FileText className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>

        {/* IT Staff Performance */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-purple-100">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-3 ml-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">أداء موظفي IT</h3>
              <p className="text-gray-500 text-sm">عدد التذاكر المعينة لكل موظف</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {IT_STAFF.map(staff => (
              <div key={staff} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border-2 border-purple-100 hover:border-purple-300 transition-all transform hover:scale-105">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-900 text-lg">{staff}</span>
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl px-4 py-2">
                    <span className="text-3xl font-bold">{filteredTickets.filter(t => t.assigned_to === staff).length}</span>
                  </div>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${filteredTickets.length > 0 ? (filteredTickets.filter(t => t.assigned_to === staff).length / filteredTickets.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <FileText className="w-6 h-6 ml-2" />
              قائمة التذاكر
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-purple-900">#</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-purple-900">العنوان</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-purple-900">الموظف</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-purple-900">الشركة</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-purple-900">القسم</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-purple-900">الأولوية</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-purple-900">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-purple-900">المعين لـ</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-purple-900">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {filteredTickets.map((ticket, index) => (
                  <tr key={ticket.id} className={`hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all ${index % 2 === 0 ? 'bg-white' : 'bg-purple-50/30'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">#{ticket.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{ticket.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.employee_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(ticket.priority)}`}>
                        {getPriorityLabel(ticket.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                        {getStatusLabel(ticket.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.assigned_to || 'غير معين'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(ticket.created_at).toLocaleDateString('ar-EG')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTickets.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-12 h-12 text-purple-600" />
              </div>
              <p className="text-gray-500 text-lg font-bold">لا توجد تذاكر تطابق الفلتر</p>
              <p className="text-gray-400 text-sm mt-2">جرب تغيير معايير التصفية</p>
            </div>
          )}
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

export default Reports;
