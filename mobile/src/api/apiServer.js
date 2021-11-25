import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:8086',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    //console.log(Object.keys(instance));
    return config;
  },
  error => {
    try {
      if (axios.isCancel(error)) {
        return new Promise(() => {});
      }
      return Promise.reject(error);
    } catch (error) {
      console.log(error);
    }
  },
);

export default instance;
