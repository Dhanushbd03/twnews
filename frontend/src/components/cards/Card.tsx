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

const Card: React.FC<Props> = ({ category, link, headline, authors, date, short_description }) => {
  return (
    <div className="flex flex-col justify-between gap-2 border border-gray-100 bg-gray-500 bg-opacity-10 bg-clip-padding p-5 drop-shadow-lg filter backdrop-blur-md backdrop-filter transition-all duration-300 hover:translate-x-1 hover:translate-y-1 sm:min-w-[48%] sm:max-w-[48%]">
      <p className="text-sm text-gray-500">{category}</p>
      <a href={link} className="text-xl font-bold">
        {headline}
      </a>
      <p className="text-sm text-gray-500">{short_description}</p>
      <div className="flex items-center pt-5">
        {authors && (
          <p className="line-clamp-1 overflow-hidden overflow-ellipsis bg-hover p-2 text-sm text-gray-500 transition-all duration-300 hover:scale-95">
            {authors}
          </p>
        )}
        <p className="ml-auto text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="flex flex-col justify-between gap-2 border border-gray-100 bg-hover bg-opacity-10 bg-clip-padding p-5 drop-shadow-lg filter backdrop-blur-md backdrop-filter transition-all duration-300 hover:translate-x-1 hover:translate-y-1 sm:min-w-[48%] sm:max-w-[48%]">
      <div className="h-5 w-24 animate-pulse rounded bg-gray-500"></div>
      <div className="h-5 w-24 animate-pulse rounded bg-gray-500"></div>
      <div className="h-5 w-24 animate-pulse rounded bg-gray-500"></div>
    </div>
  );
};
export { Card, SkeletonCard };
