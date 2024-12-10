import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import axios from "axios";
import img from "@/assets/signup.jpeg";
import { toast } from "sonner";
type Props = {};

const Signup: React.FC<Props> = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) {
      toast.error(error,{
        duration: 3000,
      });
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/register`, formData);
      toast.success(response.data.message, {
        duration: 3000,
      } );
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (formData.confirmPassword !== formData.password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [formData.confirmPassword, formData.password]);

  return (
    <div className="flex max-h-[450px] border border-hover bg-gray-500 bg-opacity-10 backdrop-blur-lg backdrop-filter sm:m-4">
      <div className="my-auto flex w-full flex-col items-center gap-3 p-5 sm:w-1/2">
        <Button divClassName="w-fit flex items-center gap-2">
          <FcGoogle className="size-6" />
          <span>Sign in with Google</span>
        </Button>

        <p className="">OR</p>
        <form className="flex w-full max-w-sm flex-col items-center gap-5" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            className="h-10"
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="h-10"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="h-10"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="h-10"
            onChange={handleChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" divClassName="w-40" className="h-10 w-40">
            Sign Up
          </Button>
        </form>
      </div>
      <div className="hidden sm:block sm:w-1/2">
        <img src={img} alt="signup" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default Signup;
