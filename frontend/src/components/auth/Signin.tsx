import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import img from "@/assets/signup.jpeg";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "react-lottie";
import loadingAnimation from "@/assets/loading.json";
import AuthContext from "@/Context/AuthProvider";

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
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
      login(formData);
      toast.success(user?.message || "Login successful", {
        duration: 3000,
      });
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred", {
        duration: 3000,
      });
      setFormData({
        username: "",
        password: "",
      });
    } finally {
      setLoading(false);
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
            height={200}
            width={200}
          />
        ) : (
          <form
            className="flex w-full max-w-sm flex-col items-center gap-5"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              className="h-10"
              onChange={handleChange}
              autoComplete="off"
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
                autoComplete="off"
                required
              />
              <Button
                divClassName="!absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-300 w-fit"
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
