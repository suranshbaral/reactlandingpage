import axios from 'axios';
import { getCookie } from '../utils/csrf'; // Adjust the path as per your project structure

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',  // Replace with your Django API base URL
});

axiosInstance.interceptors.request.use(
  config => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
