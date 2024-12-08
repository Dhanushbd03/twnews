import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../cards/Card";
import { fetchNews, fetchTopNews } from "@/services/services";

const Home = () => {
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTopNews().then((data) => setTopNews(data));
  }, []);
  return (
    <div className="w-full flex-wrap flex gap-5 justify-center">
      {topNews.map((news: any) => (
        <Card key={news._id} {...news} />
      ))}
    </div>
  );
};

export default Home;
