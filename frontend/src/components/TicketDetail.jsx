import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Edit, Trash2, MessageSquare, Archive, Image as ImageIcon } from 'lucide-react';
import API_URL from '../config/api';

function TicketDetail({ darkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const IT_STAFF = [
    'علي طارق',
    'ياسين رعد',
    'علي عبد الأمير'
  ];

  useEffect(() => {
    fetchTicket();
    fetchComments();
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tickets/${id}`);
      setTicket(response.data);
      setEditForm(response.data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tickets/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !commenterName.trim()) return;

    try {
      await axios.post(`${API_URL}/api/tickets/${id}/comments`, 
        { commenter_name: commenterName, comment: newComment }
      );
      setNewComment('');
      setCommenterName('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('employee_name', editForm.employee_name);
      formDataToSend.append('company', editForm.company);
      formDataToSend.append('title', editForm.title);
      formDataToSend.append('description', editForm.description);
      formDataToSend.append('category', editForm.category);
      formDataToSend.append('priority', editForm.priority);
      formDataToSend.append('status', editForm.status);
      formDataToSend.append('assigned_to', editForm.assigned_to || '');
      formDataToSend.append('existing_image', editForm.image_path || '');
      if (newImage) {
        formDataToSend.append('image', newImage);
      }

      await axios.put(`${API_URL}/api/tickets/${id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setEditing(false);
      setNewImage(null);
      fetchTicket();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handleDeleteTicket = async () => {
    if (!window.confirm('هل أنت متأكد من حذف هذه التذكرة؟')) return;

    try {
      await axios.delete(`${API_URL}/api/tickets/${id}`);
      navigate('/tickets');
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleArchiveTicket = async () => {
    try {
      await axios.put(`${API_URL}/api/tickets/${id}/archive`);
      fetchTicket();
    } catch (error) {
      console.error('Error archiving ticket:', error);
    }
  };

  const handleUnarchiveTicket = async () => {
    try {
      await axios.put(`${API_URL}/api/tickets/${id}/unarchive`);
      fetchTicket();
    } catch (error) {
      console.error('Error unarchiving ticket:', error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`${API_URL}/api/tickets/${id}`, {
        ...editForm,
        status: newStatus
      });
      fetchTicket();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('حدث خطأ أثناء تحديث الحالة');
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

  if (!ticket) {
    return <div className="flex items-center justify-center min-h-screen">التذكرة غير موجودة</div>;
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${darkMode ? 'text-white' : ''}`}>
      <div className="mb-6">
        <button
          onClick={() => navigate('/tickets')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          <ArrowRight className="w-5 h-5" />
          العودة
        </button>
      </div>
      <div className="text-center mb-8">
        <img src="/logo.png" alt="شعار الشركة" className="h-20 w-20 mx-auto mb-4 object-contain" />
        <h2 className={`text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ${darkMode ? 'text-white' : ''}`}>
          تفاصيل التذكرة
        </h2>
      </div>
      <div className="mb-6">
        <Link to="/tickets" className="flex items-center text-purple-600 hover:text-purple-700 font-bold">
          <ArrowRight className="w-5 h-5 ml-2" />
          العودة للتذاكر
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{ticket.title}</h2>
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
              {userRole === 'it' && (
                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => setEditing(!editing)}
                    className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                <button
                  onClick={handleDeleteTicket}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                {ticket.archived ? (
                  <button
                    onClick={handleUnarchiveTicket}
                    className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                    title="إلغاء الأرشفة"
                  >
                    <Archive className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleArchiveTicket}
                    className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
                    title="أرشفة"
                  >
                    <Archive className="w-5 h-5" />
                  </button>
                )}
              </div>
              )}
            </div>

            {editing && userRole === 'it' ? (
              <form onSubmit={handleUpdateTicket} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">اسم الموظف</label>
                    <input
                      type="text"
                      value={editForm.employee_name}
                      onChange={(e) => setEditForm({ ...editForm, employee_name: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">الشركة</label>
                    <select
                      value={editForm.company}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="smart oasis">Smart Oasis</option>
                      <option value="rasep">RASEP</option>
                      <option value="edk">EDK</option>
                      <option value="bwe">BWE</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">العنوان</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">الوصف</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">الحالة</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="pending">قيد الانتظار</option>
                      <option value="in-progress">قيد العمل</option>
                      <option value="resolved">تم الحل</option>
                      <option value="closed">مغلق</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">الأولوية</label>
                    <select
                      value={editForm.priority}
                      onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="low">منخفض</option>
                      <option value="medium">متوسط</option>
                      <option value="high">عالي</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">التصنيف</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                  <label className="block text-sm font-bold text-gray-700 mb-1">تعيين إلى</label>
                  <select
                    value={editForm.assigned_to || ''}
                    onChange={(e) => setEditForm({ ...editForm, assigned_to: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">غير معين</option>
                    {IT_STAFF.map(staff => (
                      <option key={staff} value={staff}>{staff}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">تغيير الصورة</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg">حفظ التغييرات</button>
                  <button type="button" onClick={() => setEditing(false)} className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition-all">إلغاء</button>
                </div>
              </form>
            ) : (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">الوصف</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
                </div>
                {ticket.image_path && (
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">صورة المشكلة</h3>
                    <img 
                      src={`${API_URL}${ticket.image_path}`} 
                      alt="صورة المشكلة" 
                      className="max-w-md rounded-xl shadow-lg"
                    />
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(ticket.status)}`}>
                    {getStatusLabel(ticket.status)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getPriorityColor(ticket.priority)}`}>
                    {getPriorityLabel(ticket.priority)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getCategoryColor(ticket.category)}`}>
                    {getCategoryLabel(ticket.category)}
                  </span>
                  {ticket.archived && (
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-orange-100 text-orange-800">
                      مؤرشف
                    </span>
                  )}
                </div>
                {ticket.assigned_to && (
                  <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                    <span className="font-bold text-gray-900">المعين إلى: </span>
                    <span className="text-purple-600 font-medium">{ticket.assigned_to}</span>
                  </div>
                )}
                {userRole === 'it' && (
                  <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                    <span className="font-bold text-gray-900 block mb-2">تغيير الحالة السريع:</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleStatusChange('pending')}
                        className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
                          ticket.status === 'pending'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        }`}
                      >
                        قيد الانتظار
                      </button>
                      <button
                        onClick={() => handleStatusChange('in-progress')}
                        className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
                          ticket.status === 'in-progress'
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        قيد العمل
                      </button>
                      <button
                        onClick={() => handleStatusChange('resolved')}
                        className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
                          ticket.status === 'resolved'
                            ? 'bg-green-500 text-white'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        تم الحل
                      </button>
                      <button
                        onClick={() => handleStatusChange('closed')}
                        className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
                          ticket.status === 'closed'
                            ? 'bg-gray-500 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        مغلق
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-5 h-5 ml-2 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-900">التعليقات ({comments.length})</h3>
            </div>

            <form onSubmit={handleAddComment} className="mb-6 space-y-4">
              <input
                type="text"
                value={commenterName}
                onChange={(e) => setCommenterName(e.target.value)}
                placeholder="اسمك"
                className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="أضف تعليقاً..."
                className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                rows={3}
                required
              />
              <button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg">إضافة تعليق</button>
            </form>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900">{comment.commenter_name}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-gray-500 text-center py-4">لا توجد تعليقات</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">معلومات التذكرة</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">المعرف:</span>
                <span className="font-bold text-purple-600">#{ticket.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">الموظف:</span>
                <span className="font-medium">{ticket.employee_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">الشركة:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompanyColor(ticket.company)}`}>
                  {ticket.company}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">الحالة:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                  {getStatusLabel(ticket.status)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">الأولوية:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  {getPriorityLabel(ticket.priority)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">التصنيف:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(ticket.category)}`}>
                  {getCategoryLabel(ticket.category)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">المعين إلى:</span>
                <span className="font-medium">{ticket.assigned_to || 'غير معين'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">تاريخ الإنشاء:</span>
                <span className="font-medium">{new Date(ticket.created_at).toLocaleDateString('ar-EG')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">آخر تحديث:</span>
                <span className="font-medium">{new Date(ticket.updated_at).toLocaleDateString('ar-EG')}</span>
              </div>
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
  );
}

export default TicketDetail;
