export function initAds() {
	if (!window.pbjs) {
		console.warn(
			"Prebid.js is not found. Check that it is included in index.html",
		);
		return;
	}

	console.log("Ads module initialized");

	window.pbjs.que = window.pbjs.que || [];

	window.pbjs.que.push(() => {
		window.pbjs.addAdUnits([
			{
				code: "div-gpt-ad-123",
				mediaTypes: {
					banner: {
						sizes: [
							[300, 250],
							[728, 90],
						],
					},
				},
				bids: [
					{ bidder: "adtelligent", params: { aid: "12345" } },
					{ bidder: "bidmatic", params: { placementId: "67890" } },
				],
			},
		]);
	});
}
