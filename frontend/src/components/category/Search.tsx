import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { CommandMenu } from "./CommandMenu";
import React from "react";
import { SearchIcon } from "lucide-react";
const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle keyboard shortcut (Ctrl+K or ⌘+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="relative">
      <form onSubmit={(e) => {
        e.preventDefault();
        setIsOpen(true);
      }}>
        <SearchIcon className="text-gray-500 mt-1 size-6 hover:cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110 focus:scale-95"  onClick={() => setIsOpen(true)} />
        <CommandMenu open={isOpen} setOpen={setIsOpen}  />
      </form>
    </div>
  );
};

export default Search;
