import { API_URL } from "@/lib/url";
import axios from "axios";

export const getGalleries = async (page = 1) => {
  const { data } = await axios.get(`${API_URL}/galleries?page=${page}`);
  return data.data; 
};