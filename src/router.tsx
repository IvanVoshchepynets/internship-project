import type { ComponentType, LazyExoticComponent } from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));

const withSuspense = (Component: LazyExoticComponent<ComponentType>) => (
	<Suspense fallback={<div>Loading...</div>}>
		<Component />
	</Suspense>
);

export const router = createBrowserRouter([
	{ path: "/", element: withSuspense(Home) },
	{ path: "/news", element: withSuspense(News) },
	{ path: "/news/:id", element: withSuspense(NewsDetail) },
]);
