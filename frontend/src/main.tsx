import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	useParams,
} from "react-router-dom";
import GlobalStyles from "@/styles/GlobalStyles";
import Error from "@/components/error/Error";
import "@/styles/index.css";
import App from "./App";
import Home from "./components/page/home";
import CategoryPage from "./components/page/categoryPage";
import Signup from "./components/auth/Signup";
import Signin from './components/auth/Signin';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App page={<Home />} />,
		errorElement: (
			<Error
				title="404"
				description="Page not found"
			/>
		),
	},
	{
		path: "/category/:category",
		element: <App page={<CategoryPageWrapper />} />,
	},
	{
		path: "/signup",
		element: <App page={<Signup />} />,
	},
	{
		path: "/signin",
		element: <App page={<Signin />} />,
	},
]);

const root = createRoot(document.getElementById("root")!);

function CategoryPageWrapper() {
	const params = useParams();
	return <CategoryPage category={params.category} />;
}

root.render(
	<StrictMode>
		<GlobalStyles />
		<RouterProvider router={router} />
	</StrictMode>
);
