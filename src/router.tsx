import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News"; // 👈 правильний імпорт

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/news", element: <News /> }, // 👈 тут має бути News
]);
