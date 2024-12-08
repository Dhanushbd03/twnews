import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "@/styles/GlobalStyles.tsx";
import Error from "@/components/error/Error.tsx";
import "@/styles/index.css";
import App from "./App.tsx";
import Home from "./components/page/home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App page={<Home />} />,
    errorElement: <Error title="404" description="Page not found" />,
  },
]);

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </StrictMode>
);
