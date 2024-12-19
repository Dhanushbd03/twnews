import React, { useState } from "react";
import { CommandMenu } from "./CommandMenu";
import Search from "./Search";
import Categorybar from "./Categorybar";

const Category: React.FC = () => {
  const [search, setSearch] = useState<boolean>(false);
  return (
    <div className="flex gap-5 pb-5">
      <Search />
      <CommandMenu open={search} setOpen={setSearch} />
      <Categorybar />
    </div>
  );
};

export default Category;
