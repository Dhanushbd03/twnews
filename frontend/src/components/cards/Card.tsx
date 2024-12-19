import React from "react";

type Props = {
  _id: string;
  key: string;
	category: string;
	link: string;
	headline: string;
	short_description: string;
	authors: string;
	date: string;
};

const Card: React.FC<Props> = ({
	category,
	link,
	headline,
	authors,
	date,
	short_description,
}) => {
	return (
		<div className="sm:min-w-[48%] sm:max-w-[48%] flex flex-col gap-2 filter drop-shadow-lg   p-5 bg-gray-500  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 hover:translate-x-1 hover:translate-y-1 transition-all duration-300 justify-between">
			<p className="text-sm text-gray-500">{category}</p>
			<a
				href={link}
				className="text-xl font-bold">
				{headline}
			</a>
			<p className="text-sm text-gray-500">{short_description}</p>
			<div className="flex pt-5 items-center ">
				{authors && (
					<p className="line-clamp-1 overflow-hidden overflow-ellipsis text-sm text-gray-500 bg-hover p-2 hover:scale-95 transition-all duration-300">
						{authors}
					</p>
				)}
				<p className="text-sm text-gray-500 ml-auto">{date}</p>
			</div>
		</div>
	);
};

const SkeletonCard = () => {
	return (
		<div className="sm:min-w-[48%] sm:max-w-[48%] flex flex-col gap-2 filter drop-shadow-lg   p-5  bg-hover  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 hover:translate-x-1 hover:translate-y-1 transition-all duration-300 justify-between">
			<div className="h-5 w-24 bg-gray-500 rounded animate-pulse"></div>
			<div className="h-5 w-24 bg-gray-500 rounded animate-pulse"></div>
			<div className="h-5 w-24 bg-gray-500 rounded animate-pulse"></div>
		</div>
	);
};
export { Card, SkeletonCard };
