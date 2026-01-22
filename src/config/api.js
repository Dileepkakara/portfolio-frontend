// API Configuration
let API_BASE_URL = 'https://portfolio-backend-ilcl.onrender.com'; // Default to production

// Check if running locally
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  console.log('Hostname:', hostname);
  
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('localhost')) {
    API_BASE_URL = 'http://localhost:5000';
  }
}

console.log('API Configuration:');
console.log('- API_BASE_URL:', API_BASE_URL);
console.log('- Mode:', process.env.NODE_ENV);

// Ensure API_BASE_URL is a string
if (!API_BASE_URL || typeof API_BASE_URL !== 'string') {
  API_BASE_URL = 'https://portfolio-backend-ilcl.onrender.com';
  console.warn('API_BASE_URL was invalid, using production default');
}

export default API_BASE_URL;
