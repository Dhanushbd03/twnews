import React from "react";
import { Button } from "../ui/button";

type Props = {
  className?: string;
  divClassName?: string;
};

const LoginSignup = ({ className, divClassName }: Props) => {
  return (
    <Button
      divClassName={`lg:order-1 ${divClassName}`}
      className={`uppercase font-bold hover:font-semibold ${className}`}
      size="sm"
    >
      Login or Signup
    </Button>
  );
};

export default LoginSignup;
