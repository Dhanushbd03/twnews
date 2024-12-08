import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../cards/Card";
const Home = () => {
  const [topNews, setTopNews] = useState([]);
  useEffect(() => {
    const fetch10News = async () => {
      const data = await axios.get(`/api/news`);
      setTopNews(data.data);
    };
    fetch10News();
  }, []);
  console.log(topNews);
  return (
    <div className="w-full flex-wrap flex gap-5 justify-center">
      {topNews.map((news: any) => (
        <Card key={news._id} {...news} />
      ))}
    </div>
  );
};

export default Home;
