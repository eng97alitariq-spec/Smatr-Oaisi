import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Edit, Trash2, Search, Shield, UserCheck, ArrowRight } from 'lucide-react';

function UserManagement({ darkMode }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, name: 'علي طارق', email: 'ali@smartoasis.com', role: 'it', department: 'IT Operations', status: 'active' },
    { id: 2, name: 'ياسين رعد', email: 'yassin@smartoasis.com', role: 'it', department: 'IT Support', status: 'active' },
    { id: 3, name: 'علي عبد الأمير', email: 'abdulamir@smartoasis.com', role: 'it', department: 'IT Network', status: 'active' },
    { id: 4, name: 'محمد أحمد', email: 'mohammed@smartoasis.com', role: 'employee', department: 'Engineering', status: 'active' },
    { id: 5, name: 'حسين علي', email: 'hussain@smartoasis.com', role: 'employee', department: 'Operations', status: 'active' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'employee',
    department: ''
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
      status: 'active'
    };
    setUsers([...users, user]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', role: 'employee', department: '' });
  };

  const handleDeleteUser = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const getRoleBadge = (role) => {
    return role === 'it' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const getRoleText = (role) => {
    return role === 'it' ? 'قسم IT' : 'موظف';
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
                إدارة المستخدمين
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                إدارة وصيانة حسابات المستخدمين
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              إضافة مستخدم
            </button>
          </div>
        </div>

        {/* Search */}
        <div className={`rounded-3xl shadow-2xl p-6 mb-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
          <div className="relative">
            <Search className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="بحث عن مستخدم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pr-12 pl-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-purple-200'}`}
            />
          </div>
        </div>

        {/* Users Table */}
        <div className={`rounded-3xl shadow-2xl p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className={`text-right py-4 px-4 font-bold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>المستخدم</th>
                  <th className={`text-right py-4 px-4 font-bold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>البريد الإلكتروني</th>
                  <th className={`text-right py-4 px-4 font-bold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>الدور</th>
                  <th className={`text-right py-4 px-4 font-bold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>القسم</th>
                  <th className={`text-right py-4 px-4 font-bold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>الحالة</th>
                  <th className={`text-right py-4 px-4 font-bold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
                    <td className={`py-4 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user.email}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadge(user.role)}`}>
                        {getRoleText(user.role)}
                      </span>
                    </td>
                    <td className={`py-4 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user.department}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        نشط
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`rounded-3xl shadow-2xl p-8 w-full max-w-md border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                إضافة مستخدم جديد
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    الاسم *
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-purple-200'}`}
                    placeholder="أدخل اسم المستخدم"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-purple-200'}`}
                    placeholder="أدخل البريد الإلكتروني"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    الدور *
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-purple-200'}`}
                  >
                    <option value="employee">موظف</option>
                    <option value="it">قسم IT</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    القسم *
                  </label>
                  <input
                    type="text"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-purple-200'}`}
                    placeholder="أدخل القسم"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddUser}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  إضافة
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

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

export default UserManagement;
