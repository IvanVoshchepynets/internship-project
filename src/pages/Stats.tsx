import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function fetchStats({ queryKey }: any) {
	const [_key, { date_from, date_to, events }] = queryKey;
	const params = new URLSearchParams();
	if (date_from) params.append("date_from", date_from);
	if (date_to) params.append("date_to", date_to);
	if (events) params.append("events", events);

	const res = await fetch(`/stats/query?${params.toString()}`);
	if (!res.ok) throw new Error("Failed to load stats");
	return res.json();
}

const Stats = () => {
	const [dateFrom] = useState("2025-03-01");
	const [dateTo] = useState("2025-03-31");

	const { data = [], isLoading } = useQuery({
		queryKey: ["stats", { date_from: dateFrom, date_to: dateTo }],
		queryFn: fetchStats,
	});

	const columns: GridColDef[] = [
		{ field: "timestamp", headerName: "Date/Hour", flex: 1 },
		{ field: "event", headerName: "Event Type", flex: 1 },
		{ field: "adapter", headerName: "Adapter", flex: 1 },
		{ field: "creativeId", headerName: "Creative ID", flex: 1 },
		{ field: "cpm", headerName: "CPM", flex: 1 },
		{ field: "geo", headerName: "Geo", flex: 1 },
	];

	return (
		<div style={{ height: 600, width: "100%" }}>
			<h1 className="text-xl font-bold mb-4">Statistics</h1>
			<DataGrid
				rows={data}
				columns={columns}
				pageSizeOptions={[10, 20, 50]}
				getRowId={(row) => row.id || row.timestamp + row.event}
				loading={isLoading}
			/>
		</div>
	);
};

export default Stats;
