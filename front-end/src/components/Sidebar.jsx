import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar({ user, setUser }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const links = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/employees', label: 'Employees', icon: '👥' },
    { path: '/users', label: 'Users', icon: '👤' },
    { path: '/posts', label: 'Positions', icon: '💼' },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-800 text-white h-screen flex flex-col transition-all duration-300 shadow-lg`}>
      {/* Logo Section */}
      <div className="p-4 bg-slate-900 flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold">MK CARS</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-700 rounded-lg transition"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              location.pathname === link.path
                ? 'bg-blue-600 text-white'
                : 'hover:bg-slate-700 text-gray-300'
            }`}
          >
            <span className="text-xl">{link.icon}</span>
            {isOpen && <span className="font-medium">{link.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-slate-700 space-y-3">
        {isOpen && (
          <div className="bg-slate-700 p-3 rounded-lg text-sm">
            <p className="text-gray-400 text-xs">Logged in as</p>
            <p className="font-bold truncate">{user?.FirstName} {user?.LastName}</p>
            <p className="text-gray-400 text-xs">{user?.Position}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {isOpen ? 'Logout' : '🚪'}
        </button>
      </div>
    </div>
  );
}
