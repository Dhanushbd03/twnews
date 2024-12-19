import React from "react";
import { useParams } from "react-router-dom";
type Props = {};

const Line: React.FC = () => <div className="h-[1px] w-full bg-gray-400" />;

const Title: React.FC<Props> = () => {
  const { category } = useParams();
  return (
    <div className="h-20">
      <div className="flex items-center tracking-[3px]">
        <Line />
        {category ? (
          <h1 className="text-3xl lg:text-5xl text-nowrap px-5 font-bold font-fira relative">
            
            <span className="relative">
              <span className="absolute bottom-4 left-0 w-full h-1/3 bg-hover -z-10"></span>
              {category}
            </span>
          </h1>
        ) : (
          <h1 className="text-3xl lg:text-5xl text-nowrap px-5 font-bold font-fira relative">
            <span>TODAY</span>{" "}
            <span className="relative">
              <span className="absolute bottom-4 left-0 w-full h-1/3 bg-hover -z-10"></span>
              NEWS
            </span>
          </h1>
        )}
        <Line />
      </div>
    </div>
  );
};

export default Title;
