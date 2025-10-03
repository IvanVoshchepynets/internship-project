import { useEffect, useState } from "react";
import { sendStat } from "../utils/stats";

declare global {
	interface Window {
		pbjs?: {
			onEvent: (event: string, callback: () => void) => void;
		};
	}
}

export default function AdsDebug() {
	const [logs, setLogs] = useState<string[]>([]);

	useEffect(() => {
		if (!window.pbjs) return;

		const addLog = (msg: string, eventName?: string) => {
			setLogs((prev) => [...prev, `${new Date().toISOString()} - ${msg}`]);
			if (eventName) sendStat(eventName);
		};

		window.pbjs.onEvent("bidRequested", () =>
			addLog("Bid requested", "bidRequested"),
		);
		window.pbjs.onEvent("bidResponse", () =>
			addLog("Bid response received", "bidResponse"),
		);
		window.pbjs.onEvent("auctionEnd", () =>
			addLog("Auction ended", "auctionEnd"),
		);
		window.pbjs.onEvent("bidWon", () => addLog("Bid won", "bidWon"));

		addLog("Subscribed to Prebid events");
	}, []);

	return (
		<div className="p-6">
			<h1 className="text-xl font-bold mb-4">Логи Prebid аукціону</h1>
			<pre className="bg-black text-green-400 p-4 rounded h-96 overflow-y-scroll">
				{logs.join("\n")}
			</pre>
		</div>
	);
}
