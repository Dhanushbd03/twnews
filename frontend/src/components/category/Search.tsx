import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { CommandMenu } from "./CommandMenu";
import React from "react";
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
    <div className="relative w-full md:w-1/3">
      <Input
        placeholder="Search... (⌘ K)"
        onClick={() => setIsOpen(true)}
        className="w-full"
      />
      <CommandMenu open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};

export default Search;
