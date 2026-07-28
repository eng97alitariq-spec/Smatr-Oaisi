import React from 'react';
import { Moon, Sun } from 'lucide-react';

function Navbar({ userRole, setUserRole, darkMode, setDarkMode }) {
  return (
    <nav className={`shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="شعار الشركة" className="h-12 w-12 object-contain" />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>🏢 Smart Oasis - نظام إدارة الخدمات</h1>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
