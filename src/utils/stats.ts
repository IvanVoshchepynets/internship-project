export function sendStat(event: string, extra: Record<string, any> = {}) {
	fetch("http://localhost:3000/stats/event", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify([
			{
				event,
				timestamp: Date.now(),
				pageUrl: window.location.href,
				...extra,
			},
		]),
	}).catch((err) => console.error("Stat send error", err));
}
