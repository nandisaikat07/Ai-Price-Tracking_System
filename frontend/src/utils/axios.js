import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5002',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo')).token
      : null;
    
    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log the request for debugging
    console.log('Making request to:', config.url, {
      method: config.method,
      headers: config.headers
    });
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log('Received response from:', response.config.url, {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    if (error.response) {
      // Log error responses for debugging
      console.error('Response error:', {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data
      });

      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear user info and redirect to login
          localStorage.removeItem('userInfo');
          window.location.href = '/signin';
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Error in request configuration
      console.error('Request configuration error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance; 