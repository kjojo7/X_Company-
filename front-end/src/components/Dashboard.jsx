import { useEffect, useState } from 'react';
import { getEmployees, getUsers, getPosts } from '../api';

export default function Dashboard({ user }) {
  const [stats, setStats] = useState({
    employees: 0,
    users: 0,
    posts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [empRes, userRes, postRes] = await Promise.all([
          getEmployees(),
          getUsers(),
          getPosts(),
        ]);
        setStats({
          employees: empRes.data.length,
          users: userRes.data.length,
          posts: postRes.data.length,
        });
      } catch {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {user?.FirstName}!</h1>
        <p className="text-gray-600">Here's an overview of your HR Management System</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading statistics...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Employees Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Employees</p>
                  <p className="text-4xl font-bold text-blue-600 mt-2">{stats.employees}</p>
                </div>
                <div className="text-5xl">👥</div>
              </div>
              <p className="text-gray-500 text-sm mt-4">Active workforce</p>
            </div>

            {/* Users Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">System Users</p>
                  <p className="text-4xl font-bold text-green-600 mt-2">{stats.users}</p>
                </div>
                <div className="text-5xl">👤</div>
              </div>
              <p className="text-gray-500 text-sm mt-4">User accounts</p>
            </div>

            {/* Positions Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Job Positions</p>
                  <p className="text-4xl font-bold text-purple-600 mt-2">{stats.posts}</p>
                </div>
                <div className="text-5xl">💼</div>
              </div>
              <p className="text-gray-500 text-sm mt-4">Available positions</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-gray-800">Your Role</h3>
                <p className="text-gray-600">{user?.Position}</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-bold text-gray-800">Department</h3>
                <p className="text-gray-600">HR Management</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="font-bold text-gray-800">System Status</h3>
                <p className="text-gray-600">✓ All systems operational</p>
              </div>
              <div className="border-l-4 border-orange-600 pl-4">
                <h3 className="font-bold text-gray-800">Last Login</h3>
                <p className="text-gray-600">Today</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
