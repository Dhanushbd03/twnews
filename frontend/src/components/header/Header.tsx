import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import Menu from "./Menu";
import Navbar from "./Navbar";
import React from "react";

const Header: React.FC = (): JSX.Element => {
  return (
    <header className="py-10 flex items-center gap-3 sm:gap-10 lg:gap-0">
      <Logo className="lg:order-1 text-md lg:text-2xl mr-auto lg:mr-0" />
      <Menu className="order-3 lg:order-1 lg:mx-20" />
      <Navbar
        className={`hidden md:flex text-md lg:text-lg md:px-0 lg:px-10 lg:order-1`}
      />
      <Button
        divClassName="lg:ml-auto lg:order-1 "
        className="uppercase font-bold hover:font-semibold"
        size="sm"
      >
        Contact US
      </Button>
    </header>
  );
};

export default Header;
