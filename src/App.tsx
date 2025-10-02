import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
	useEffect(() => {
		if (import.meta.env.VITE_ENABLE_STATS === "true") {
			import("./stats/statsModule").then(({ initStats }) => {
				initStats();
			});
		}
	}, []);

	return <RouterProvider router={router} />;
}

export default App;
