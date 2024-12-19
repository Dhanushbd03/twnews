import React, { useState } from "react";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { X } from "lucide-react";
import Navbar from "./Navbar";
import LoginSignup from "./LoginSignup";
type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  
  return (
    <div
      className={`md:hidden fixed top-0 left-0 h-screen bg-customBackground bg-opacity-100 backdrop-filter backdrop-blur-sm z-50 overflow-hidden transition-all duration-300 ease-in-out border-r border-primary ${
        isOpen ? "w-72" : "w-0"
      }`}
    >
      <div className="w-full h-full">
        <div className="flex justify-between items-center py-5 px-5">
          <Logo className="text-2xl font-bold" />
          <Button onClick={() => setIsOpen(false)}>
            <X size={20} />
          </Button>
        </div>
        <Navbar className="text-md lg:text-lg md:px-0 lg:px-10 lg:order-1 flex-col gap-5 items-start" />
        <LoginSignup className="w-full" divClassName="w-40 mx-auto mt-10" />
      </div>
    </div>
  );
};

export default Sidebar;
