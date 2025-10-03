type StatEvent = {
	event: string;
	timestamp: number;
	pageUrl: string;
	adapter?: string;
	creativeId?: string;
	cpm?: number;
	geo?: string;
};

function sendStat(data: StatEvent) {
	try {
		navigator.sendBeacon(
			"http://localhost:3000/stats/event",
			JSON.stringify(data),
		);
	} catch (err) {
		console.warn("Beacon send failed", err);
	}
}

export function initStats() {
	const pageUrl = window.location.href;

	sendStat({ event: "pageLoad", timestamp: Date.now(), pageUrl });

	window.addEventListener("adModuleLoaded", () => {
		sendStat({ event: "adModuleLoad", timestamp: Date.now(), pageUrl });
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
					timestamp: Date.now(),
					pageUrl,
				};

				if (args?.bidder) stat.adapter = args.bidder;
				if (args?.adId) stat.creativeId = args.adId;
				if (args?.cpm) stat.cpm = args.cpm;
				if (args?.geo) stat.geo = args.geo;

				sendStat(stat);
			});
		});
	}
}
