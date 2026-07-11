import { getToken } from '../utils/auth.js';

const API_URL = import.meta.env.VITE_API_URL;

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
};

// 🔐 Auth APIs
export const authAPI = {
  signup: (email, password, name) =>
    apiCall('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    }),

  login: (email, password) =>
    apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  getMe: () => apiCall('/api/auth/me', { method: 'GET' })
};

// 📚 Resource APIs
export const resourceAPI = {
  // GET resources with sorting
  // getResources: (page = 1, limit = 10, sort = "trending",subject="ALL") =>
  //   apiCall(`/resources?page=${page}&limit=${limit}&sort=${sort}&subject=${subject}`, {
  getResources: (page = 1, limit = 10, sort = "trending",subject="ALL") =>
    apiCall(`/api/resources?page=${page}&limit=${limit}&sort=${sort}&subject=${subject}`, {
      method: 'GET'
    }),

  // ✅ FIXED: now accepts object
  // createResource: (data) =>
  //   apiCall('/resources', {
  createResource: (data) =>
    apiCall('/api/resources', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // Vote
  // voteResource: (id) =>
  //   apiCall(`/resources/${id}/vote`, {
  voteResource: (id) =>
    apiCall(`/api/resources/${id}/vote`, {
      method: 'POST'
    })
};

export default apiCall;