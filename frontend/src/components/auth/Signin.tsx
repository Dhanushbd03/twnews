import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import axios from "axios";
import img from "@/assets/signup.jpeg";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "react-lottie";
import loadingAnimation from "@/assets/loading.json";

type Props = {};

const Signin: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/login`, formData);
      setLoading(false);
      toast.success(response.data.message, {
        duration: 3000,
      });
      document.cookie = `token=${response.data.token}; path=/; max-age=86400; secure; samesite=strict`;
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        duration: 3000,
      });
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex max-h-[600px] border border-hover bg-gray-500 bg-opacity-10 backdrop-blur-lg backdrop-filter sm:m-4">
      <div className="my-auto flex w-full flex-col items-center gap-16 p-5 sm:w-1/2">
        <Button divClassName="w-fit flex items-center gap-2">
          <FcGoogle className="size-6" />
          <span>Sign in with Google</span>
        </Button>

        <p className="">OR</p>
        {loading ? (
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: loadingAnimation,
            }}
          />
        ) : (
          <form
            className="flex w-full max-w-sm flex-col items-center gap-5"
            onSubmit={handleSubmit}
          >
            <Input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              className="h-10"
              onChange={handleChange}
              required
            />
            <div className="relative w-full">
              <Input
                type={show ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Password"
                className="h-10"
                onChange={handleChange}
                required
              />
              <Button
                divClassName="!absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-300 w-fit "
                className=""
                onClick={() => setShow(!show)}
                type="button"
              >
                {show ? (
                  <Eye className="text-primary hover:fill-hover hover:stroke-black" />
                ) : (
                  <EyeOff className="text-primary hover:fill-hover hover:stroke-black" />
                )}
              </Button>
            </div>
            <Button type="submit" divClassName="w-40" className="h-10 w-40">
              Sign In
            </Button>
          </form>
        )}

        <p className="py-5 text-sm text-gray-500">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      <div className="hidden sm:block sm:w-1/2">
        <img src={img} alt="signin" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default Signin;
