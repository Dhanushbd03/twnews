import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, SkeletonCard } from "../cards/Card";
import { fetchNews, fetchTopNews } from "@/services/services";

const Home = () => {
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetchTopNews().then((data) => setTopNews(data));
    setLoading(false);
  }, []);
  return (
    <div className="w-full flex-wrap flex gap-5 justify-center">
      {loading
        ? Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : topNews.map((news: any) => <Card key={news._id} {...news} />)}
    </div>
  );
};

export default Home;
