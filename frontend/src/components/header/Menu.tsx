import { Menu as MenuIcon } from "lucide-react";
import React from "react";

interface MenuProps {
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  return (
    <div className={`cursor-pointer ${className} relative`}>
      <MenuIcon className="hover:text-primary/50 transition-colors duration-300" />
    </div>
  );
};

export default Menu;
