import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import axios from "axios";

type Props = {};

const Signup = (props: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    axios.post("http://localhost:3000/api/auth/signup", {
      username,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="m-4 border border-hover bg-gray-500 bg-opacity-10 backdrop-blur-lg backdrop-filter">
      <div className="flex w-full flex-col items-center gap-3 p-5">
        <Button divClassName="w-fit flex items-center gap-2">
          <FcGoogle className="size-6" />
          <span>Sign in with Google</span>
        </Button>

        <p className="">OR</p>
        <form className="flex flex-col gap-5">
          <Input
            type="text"
            placeholder="Username"
            className="h-10"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            type="email"
            placeholder="Email"
            className="h-10"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            className="h-10"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            className="h-10"
            onChange={(e) => {
              password === e.target.value ? setConfirmPassword(e.target.value) : null;
            }}
          />
          <Button type="submit" className="h-10 w-full rounded-lg" onSubmit={handleSubmit}>
            Sign Up
          </Button>
        </form>
      </div>
      <div className="hidden w-1/2"></div>
    </div>
  );
};

export default Signup;
