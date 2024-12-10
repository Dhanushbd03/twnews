import React, { useEffect, useState } from "react";
import { Card, SkeletonCard } from "../cards/Card";
import { fetchTopNews } from "@/services/services";

const Home: React.FC = () => {
  const [topNews, setTopNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchTopNews();
        setTopNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top news:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex w-full flex-wrap justify-center gap-5">
      {loading || error
        ? Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
        : topNews.map((news) => <Card key={news._id} {...news} />)}
    </div>
  );
};

export default Home;
