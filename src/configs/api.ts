import axios from 'axios';
import { BaseUrl } from './constants';

const api = axios.create({
  baseURL: BaseUrl,
});

export default api;
