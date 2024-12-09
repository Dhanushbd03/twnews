import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
interface CategoryItemProps {
	category: string;
}
const CategoryItem = ({ category }: CategoryItemProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsHovered(true);
		}
	};
	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	useEffect(() => {
		if (isHovered) {
			const categoryBox = document.querySelector(".categoryBox");
			categoryBox;
		}
	}, [isHovered]);

	return (
		<div
			className="flex items-center justify-center relative group categoryBox"
			onMouseMove={scrollINdiv}>
			{" "}
			<Link
				to={`/category/${category}`}
				className="text-nowrap tracking tracking-wider group-hover:scale-125 group-hover:text-gray-900 group-hover:font-bold text-xl  transition-all duration-300 text-gray-500 ">
				{category}
			</Link>
		</div>
	);
};

export default CategoryItem;
