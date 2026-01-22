// API Configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://portfolio-backend-ilcl.onrender.com'
  : 'http://localhost:5000';

export default API_BASE_URL;
