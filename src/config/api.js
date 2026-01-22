// API Configuration - Backend deployed on Render
const API_BASE_URL = 'https://portfolio-backend-ilcl.onrender.com';

if (!API_BASE_URL || API_BASE_URL.includes('undefined')) {
  console.error('❌ API_BASE_URL is not properly configured!');
  throw new Error('API configuration failed');
}

console.log('✅ API_BASE_URL:', API_BASE_URL);
window.__API_BASE_URL = API_BASE_URL; // Debug

export default API_BASE_URL;
