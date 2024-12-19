import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { fetchCategory } from "@/services/services";

interface Category {
  id: string;
  name: string;
  // Add other properties as needed
}

const Categorybar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const scrollDiv = document.getElementById("scrollCategory");
    let scrollInterval: number | null = null;

    const startAutoScroll = () => {
      if (!scrollDiv) return;
      scrollInterval = window.setInterval(() => {
        if (scrollDiv.scrollLeft + scrollDiv.clientWidth >= scrollDiv.scrollWidth) {
          scrollDiv.scrollLeft = 0;
        } else {
          scrollDiv.scrollLeft += 1;
        }
      }, 20);
    };

    startAutoScroll();

    return () => {
      if (scrollInterval !== null) clearInterval(scrollInterval);
    };
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories: Category[] = await fetchCategory();
        setCategories(fetchedCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);
  return (
    <div
      id="scrollCategory"
      className="no-scrollbar flex items-center gap-16 overflow-x-scroll px-5"
    >
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-5 w-24 animate-pulse rounded bg-gray-500"></div>
          ))
        : categories.map((category, index) => (
            <CategoryItem key={index} category={category} />
          ))}
    </div>
  );
};

export default Categorybar;
