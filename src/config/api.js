// API Configuration
const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';

const API_BASE_URL = isDev 
  ? 'http://localhost:5000'
  : 'https://portfolio-backend-ilcl.onrender.com';

console.log('Environment:', isDev ? 'development' : 'production');
console.log('API_BASE_URL:', API_BASE_URL);

export default API_BASE_URL;
