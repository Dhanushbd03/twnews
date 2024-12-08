import React from "react";

type Props = {
  link: string;
  headline: string;
  author: string;
  date: string;
};

const Card = ({ link, headline, author, date }: Props) => {
  return (
    <div className="flex flex-col gap-2 bg-hover max-w-xs p-5">
      <a href={link} className="text-xl font-bold">
        {headline}
      </a>
      <p className="text-sm text-gray-500">{author}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  );
};

export default Card;
