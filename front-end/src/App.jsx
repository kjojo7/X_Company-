import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Users from './components/Users';
import Posts from './components/Posts';
import Login from './components/Login';
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div className="flex h-screen bg-gray-100">
          <Sidebar user={user} setUser={setUser} />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/users" element={<Users />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  )
}

export default App

