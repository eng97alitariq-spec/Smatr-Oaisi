import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import CreateTicket from './components/CreateTicket';
import Reports from './components/Reports';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserManagement from './components/UserManagement';
import Notifications from './components/Notifications';
import Settings from './components/Settings';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem('userRole');
      setUserRole(role);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!userRole) {
      return <Navigate to="/login" />;
    }
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to={userRole === 'employee' ? '/tickets/new' : '/'} />;
    }
    return children;
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
        {userRole && <Navbar userRole={userRole} setUserRole={setUserRole} darkMode={darkMode} setDarkMode={setDarkMode} />}
        <Routes>
          <Route path="/login" element={<Login setUserRole={setUserRole} darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route 
            path="/" 
            element={
              !userRole ? <Navigate to="/login" /> : (
                <ProtectedRoute allowedRoles={['it']}>
                  <Home userRole={userRole} darkMode={darkMode} />
                </ProtectedRoute>
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['it']}>
                <Dashboard darkMode={darkMode} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tickets" 
            element={
              <ProtectedRoute allowedRoles={['it']}>
                <TicketList darkMode={darkMode} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tickets/:id" 
            element={
              <ProtectedRoute allowedRoles={['it']}>
                <TicketDetail darkMode={darkMode} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tickets/new" 
            element={
              <ProtectedRoute allowedRoles={['employee', 'it']}>
                <CreateTicket darkMode={darkMode} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute allowedRoles={['it']}>
                <Reports darkMode={darkMode} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users" 
            element={
              <ProtectedRoute allowedRoles={['it']}>
                <UserManagement darkMode={darkMode} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute allowedRoles={['it']}>
                <Notifications darkMode={darkMode} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute allowedRoles={['it']}>
                <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
