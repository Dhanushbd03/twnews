import React from "react";
import { CommandMenu } from "./CommandMenu";
import Search from "./Search";
import Categorybar from "./Categorybar";
const Category = () => {
  const [search, setSearch] = React.useState(false);
  return (
    <div className="flex  gap-5 pb-5">
      <Search />
      <CommandMenu open={search} setOpen={setSearch} />
      <Categorybar />
    </div>
  );
};

export default Category;
