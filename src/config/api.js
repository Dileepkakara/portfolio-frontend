// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (
  import.meta.env.MODE === 'production'
    ? 'https://portfolio-backend-ilcl.onrender.com'
    : 'http://localhost:5000'
);

export default API_BASE_URL;
