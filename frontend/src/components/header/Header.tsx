import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import Menu from "./Menu";
import Navbar from "./Navbar";
import React from "react";
import { MenuIcon } from "lucide-react";
import LoginSignup from "./LoginSignup";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const Header: React.FC<Props> = ({ setIsOpen }): JSX.Element => {
  return (
    <header className="py-10 flex items-center gap-3 sm:gap-10 lg:gap-0">
      <Logo className="lg:order-1 text-md lg:text-2xl mr-auto lg:mr-0 text-nowrap" />
      <Navbar
        className={`hidden md:flex text-md lg:text-lg md:px-0 lg:px-10 lg:order-1 mx-auto`}
      />
      <LoginSignup className="lg:order-2 hidden md:block" />
      <Button onClick={() => setIsOpen(true)} className="md:hidden">
        <MenuIcon size={20} />
      </Button>
    </header>
  );
};

export default Header;
