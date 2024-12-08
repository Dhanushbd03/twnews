import axios from "axios";
export const fetchCategory = async () => {
  const response = await axios({
    method: "get",
    baseURL: `${import.meta.env.VITE_URL}`,
    url: "/news/category",
  });
  return response.data;
};

export const fetchNews = async (category: string) => {
      const response = await axios({
    method: "get",
    baseURL: `${import.meta.env.VITE_URL}`,
    url: `/news/${category}`,
  });
  return response.data;
};

export const fetchTopNews = async () => {
  const response = await axios({
      method: "get",
      baseURL: `${import.meta.env.VITE_URL}`,
      url: "/news",
  });
  console.log(response.data);
  return response.data;
};
