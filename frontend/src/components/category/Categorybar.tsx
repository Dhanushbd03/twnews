import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { fetchCategory } from "@/services/services";

const Categorybar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategory();
      setCategories(fetchedCategories);
      setLoading(false);
    };
    getCategories();
  }, []);

  return (
    <div className="overflow-x-scroll flex gap-5 no-scrollbar">
      {loading ? (
        <div>Loading...</div> // Skeleton placeholder
      ) : (
        categories.map((category: any, index: number) => (
          <CategoryItem key={index} category={category} />
        ))
      )}
    </div>
  );
};

export default Categorybar;
