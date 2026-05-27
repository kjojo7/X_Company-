import { useEffect, useState } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    DateOfBirth: '',
    Email: '',
    PhoneNumber: '',
    Position: '',
    Department: '',
    Address: '',
    Salary: '',
    Status: 'Active',
  });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await getEmployees();
      setEmployees(res.data);
      setError('');
    } catch {
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEmployee(editingId, formData);
        setError('');
        setError(''); // Clear previous error
      } else {
        await createEmployee(formData);
      }
      setFormData({
        FirstName: '',
        LastName: '',
        Gender: '',
        DateOfBirth: '',
        Email: '',
        PhoneNumber: '',
        Position: '',
        Department: '',
        Address: '',
        Salary: '',
        Status: 'Active',
      });
      setShowForm(false);
      setEditingId(null);
      fetchEmployees();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save employee');
    }
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee.EmployeeID);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch {
        setError('Failed to delete employee');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Employees Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            if (showForm) {
              setFormData({
                FirstName: '',
                LastName: '',
                Gender: '',
                DateOfBirth: '',
                Email: '',
                PhoneNumber: '',
                Position: '',
                Department: '',
                Address: '',
                Salary: '',
                Status: 'Active',
              });
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          {showForm ? 'Cancel' : '+ Add Employee'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Employee' : 'Add New Employee'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="FirstName"
              placeholder="First Name *"
              value={formData.FirstName}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="LastName"
              placeholder="Last Name *"
              value={formData.LastName}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="Gender"
              value={formData.Gender}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="date"
              name="DateOfBirth"
              value={formData.DateOfBirth}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="PhoneNumber"
              placeholder="Phone Number"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="Position"
              placeholder="Position"
              value={formData.Position}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="Department"
              placeholder="Department"
              value={formData.Department}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="Address"
              placeholder="Address"
              value={formData.Address}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="Salary"
              placeholder="Salary"
              value={formData.Salary}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="Status"
              value={formData.Status}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
            <button
              type="submit"
              className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              {editingId ? 'Update Employee' : 'Add Employee'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading employees...</p>
          </div>
        </div>
      ) : employees.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">No employees found. Add one to get started!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Position</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Department</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.EmployeeID} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{emp.FirstName} {emp.LastName}</td>
                  <td className="px-6 py-3 text-sm">{emp.Email}</td>
                  <td className="px-6 py-3 text-sm">{emp.Position}</td>
                  <td className="px-6 py-3 text-sm">{emp.Department}</td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      emp.Status === 'Active' ? 'bg-green-200 text-green-800' :
                      emp.Status === 'On Leave' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {emp.Status}
                    </span>
                  </td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.EmployeeID)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
