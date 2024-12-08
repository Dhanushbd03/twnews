import { Link } from "react-router-dom";

interface CategoryItemProps {
  category: string;
}
const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex items-center justify-center relative group ">
      <Link to={`/category/${category}`} className="text-nowrap tracking tracking-wider group-hover:scale-125 group-hover:text-gray-900 group-hover:font-bold text-xl  transition-all duration-300 text-gray-500 " >
        {category}
      </Link>
    </div>
  );
};

export default CategoryItem;
