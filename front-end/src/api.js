import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Auth
export const loginUser = (username, password) =>
  api.post('/auth/login', { username, password });

export const logoutUser = () =>
  api.post('/auth/logout');

export const getCurrentUser = () =>
  api.get('/auth/me');

// Employees
export const getEmployees = () =>
  api.get('/employees');

export const getEmployee = (id) =>
  api.get(`/employees/${id}`);

export const createEmployee = (data) =>
  api.post('/employees', data);

export const updateEmployee = (id, data) =>
  api.put(`/employees/${id}`, data);

export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`);

// Users
export const getUsers = () =>
  api.get('/users');

export const createUser = (data) =>
  api.post('/users', data);

export const deleteUser = (id) =>
  api.delete(`/users/${id}`);

// Posts
export const getPosts = () =>
  api.get('/posts');

export const createPost = (data) =>
  api.post('/posts', data);

export const updatePost = (id, data) =>
  api.put(`/posts/${id}`, data);

export const deletePost = (id) =>
  api.delete(`/posts/${id}`);

// Reports
export const getReports = () =>
  api.get('/reports');

export default api;
