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
    <div className="overflow-x-scroll flex gap-16 no-scrollbar items-center px-5 " >
      {categories?.map((category: any, index: number) =>
        loading ? (
          <div className="h-5 w-24 bg-gray-500 rounded animate-pulse"></div>
        ) : (
          <CategoryItem key={index} category={category} />
        )
      )}
    </div>
  );
};

export default Categorybar;
