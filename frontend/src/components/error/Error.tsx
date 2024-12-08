import * as React from "react";
import Layout from "@/components/layout/Layout";
// import animationData from "@/assets/animation.json";
import Lottie from "react-lottie";

interface ErrorProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

const Error: React.FC<ErrorProps> = ({ title, description, variant = "default" }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: "animationData",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    },
    variant: variant
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center ">
        <Lottie options={defaultOptions} height={400} width={400} />
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
    </Layout>
  )
}

export default Error;
