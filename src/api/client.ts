import axios from 'axios';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5001';
  }

  return 'http://localhost:5001';
};

let authToken: string | null = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTg0N2FiYTg2MTA5NzBjZmI4MmUxZjEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc4NzA2NzA5MiwiZXhwIjoxNzg3NjcxODkyfQ.iZQ5dROXjaOo7IdoEZ1YaCCSjxnA9wzrnHquA7_zpjM';

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  if (authToken) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${authToken}`,
    } as any;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  },
);

export const API_BASE_URL = getBaseUrl();
