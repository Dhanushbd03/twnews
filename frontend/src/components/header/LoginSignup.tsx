import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type Props = {
	className?: string;
	divClassName?: string;
};

const LoginSignup = ({ className, divClassName }: Props) => {
	const navigate = useNavigate();
	return (
		<Button
			divClassName={`lg:order-1 ${divClassName}`}
			className={`uppercase font-bold hover:font-semibold ${className}`}
			size="sm"
			onClick={() => {
				navigate("/signup");
			}}>
			Login or Signup
		</Button>
	);
};

export default LoginSignup;
