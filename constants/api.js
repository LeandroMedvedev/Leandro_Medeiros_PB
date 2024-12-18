import axios from 'axios';
import Constants from 'expo-constants';

const { API_BASE_URL } = Constants.expoConfig.extra;

export const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
});
