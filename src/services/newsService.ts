import { API_URL } from '@/lib/url';
import axios from 'axios';
export const getNews = async (page = 1) => {
  const response = await axios.get(`${API_URL}/news?page=${page}`);
  return response.data.data;
};