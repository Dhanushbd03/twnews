import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { fetchCategory } from "@/services/fetchCategory";

const Categorybar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategory();
      setCategories(fetchedCategories);
    };
    getCategories();
  }, []);

  return (
    <div className="overflow-x-scroll flex gap-5 no-scrollbar">
      {categories.map((category: any) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categorybar;
