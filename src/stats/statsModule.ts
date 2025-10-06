type StatEvent = {
	event: string;
	timestamp: number;
	pageUrl: string;
	adapter?: string;
	creativeId?: string;
	cpm?: number;
	geo?: string;
	[key: string]: any;
};

export function sendStat(event: string, extra: Record<string, any> = {}): void {
	const url = "http://localhost:3000/stats/event";

	const payload: StatEvent = {
		event,
		timestamp: Math.floor(Date.now() / 1000),
		pageUrl: window.location.href,
		...extra,
	};

	const body = JSON.stringify([payload]);

	try {
		const blob = new Blob([body], { type: "application/json" });
		const sent = navigator.sendBeacon(url, blob);

		if (!sent) {
			throw new Error("sendBeacon returned false");
		}
	} catch (err) {
		console.warn("sendBeacon failed, fallback to fetch:", err);
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		}).catch((e) => console.warn("Fetch fallback failed:", e));
	}
}

export function initStats(): void {
	const pageUrl = window.location.href;

	sendStat("pageLoad", { pageUrl });

	window.addEventListener("adModuleLoaded", () => {
		sendStat("adModuleLoad", { pageUrl });
	});

	if (window.pbjs && window.pbjs.onEvent) {
		const events = [
			"auctionInit",
			"auctionEnd",
			"bidRequested",
			"bidResponse",
			"bidWon",
		];

		events.forEach((ev) => {
			window.pbjs!.onEvent(ev, (args: any) => {
				const stat: StatEvent = {
					event: ev,
					timestamp: Math.floor(Date.now() / 1000),
					pageUrl,
				};

				if (args?.bidder) stat.adapter = args.bidder;
				if (args?.adId) stat.creativeId = args.adId;
				if (args?.cpm) stat.cpm = args.cpm;
				if (args?.geo) stat.geo = args.geo;

				sendStat(ev, stat);
			});
		});
	}
}
