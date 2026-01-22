// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (
  import.meta.env.MODE === 'production'
    ? 'https://portfolio-backend-ilcl.onrender.com'
    : 'http://localhost:5000'
);

console.log('API_BASE_URL:', API_BASE_URL);
console.log('MODE:', import.meta.env.MODE);
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);

export { API_BASE_URL };
export default API_BASE_URL;
