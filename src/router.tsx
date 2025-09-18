import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";

export const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/news", element: <News /> },
	{ path: "/news/:id", element: <NewsDetail /> },
]);
