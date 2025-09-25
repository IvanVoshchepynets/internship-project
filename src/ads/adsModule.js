export function initAds() {
	window.pbjs = window.pbjs || { que: [] };

	window.pbjs.que.push(() => {
		const adUnits = [
			{
				code: "div-gpt-ad-300x250",
				mediaTypes: {
					banner: { sizes: [[300, 250]] },
				},
				bids: [
					{ bidder: "adtelligent", params: { aid: 12345 } },
					{ bidder: "bidmatic", params: { placementId: 67890 } },
				],
			},
			{
				code: "div-gpt-ad-728x90",
				mediaTypes: {
					banner: { sizes: [[728, 90]] },
				},
				bids: [
					{ bidder: "adtelligent", params: { aid: 54321 } },
					{ bidder: "bidmatic", params: { placementId: 98765 } },
				],
			},
		];

		window.pbjs.addAdUnits(adUnits);

		window.pbjs.requestBids({
			bidsBackHandler: () => {
				console.log("Bids:", window.pbjs.getBidResponses());
			},
		});
	});
}
