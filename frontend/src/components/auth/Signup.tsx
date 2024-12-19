import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import axios from "@/api/axios";
import img from "@/assets/signup.jpeg";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "react-lottie";
import loadingAnimation from "@/assets/loading.json";
import useAuth from "@/Context/AuthProvider";
type Props = {};

const Signup: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if(user) {
    navigate("/");
  }
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (error) {
      toast.error(error, {
        duration: 3000,
      });
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`/auth/register`, formData);
      toast.success(response?.data?.message, {
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 3000,
      });
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } finally {
      setLoading(false);
    }
  };

  //confirm password
  useEffect(() => {
    if (formData.confirmPassword !== formData.password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [formData.confirmPassword, formData.password]);

  // regex for password
  useEffect(() => {
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
    } else if (!/[A-Z]/.test(formData.password)) {
      setError("Password must contain at least one uppercase letter");
    } else if (!/[a-z]/.test(formData.password)) {
      setError("Password must contain at least one lowercase letter");
    } else if (!/\d/.test(formData.password)) {
      setError("Password must contain at least one number");
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      setError("Password must contain at least one special character");
    } else {
      setError("");
    }
  }, [formData.password]);

  return (
    <div className="flex max-h-[600px] border border-hover bg-gray-500 bg-opacity-10 backdrop-blur-lg backdrop-filter sm:m-4">
      <div className="my-auto flex w-full flex-col items-center gap-3 p-5 sm:w-1/2">
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
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              className="h-10"
              onChange={handleChange}
              required
            />
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
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              className="h-10"
              onChange={handleChange}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" divClassName="w-40" className="h-10 w-40">
              Sign Up
            </Button>
          </form>
        )}

        <p className="py-5 text-sm text-gray-500">
          Already have an account? <Link to="/signin">Login</Link>
        </p>
      </div>
      <div className="hidden sm:block sm:w-1/2">
        <img src={img} alt="signup" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default Signup;
