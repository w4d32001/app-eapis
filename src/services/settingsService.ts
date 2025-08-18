import { API_URL } from '@/lib/url';
import axios from 'axios';
export const settingsService = async () => {
  const response = await axios.get(`${API_URL}/settings`);
  return response.data.data;
};