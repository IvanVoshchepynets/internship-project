import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { initAds } from "./ads/adsModule";

function App() {
	useEffect(() => {
		initAds();
	}, []);

	return <RouterProvider router={router} />;
}

export default App;