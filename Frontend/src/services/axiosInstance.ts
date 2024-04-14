import axios from 'axios';
import { selectToken } from '../features/userSlice/authSlice';
import { store } from '../Store/store';


const initialToken = selectToken(store.getState());


const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 1000,
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': initialToken ? `Bearer ${initialToken}` : undefined, 
  }
});

// Update Axios instance headers whenever token changes in the Redux store
store.subscribe(() => {
  const newToken = selectToken(store.getState());
  if (newToken) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${newToken}`;
  } else {
    delete axiosInstance.defaults.headers['Authorization'];
  }
});

export default axiosInstance;
