import axios from "axios";

export const fetchCategory = async () => {
  const response = await axios.get(`/api/news/category`);
  return response.data;
};