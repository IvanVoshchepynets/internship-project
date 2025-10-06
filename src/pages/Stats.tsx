import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

async function fetchStats() {
	const res = await fetch("http://localhost:3000/stats/query?limit=300");
	if (!res.ok) throw new Error("Failed to load stats");
	const json = await res.json();
	return json.data ?? [];
}

const Stats = () => {
	useEffect(() => {
		if (import.meta.env.VITE_ENABLE_STATS === "true") {
			import("../stats/statsModule").then(({ initStats }) => {
				initStats();
			});
		}
	}, []);

	const { data: rows = [], isLoading } = useQuery({
		queryKey: ["stats"],
		queryFn: fetchStats,
	});

	const rowsWithId = rows
		.filter((row: any) => row.event && row.event.trim() !== "")
		.map((row: any, i: number) => ({
			id: i,
			...row,
			timestamp: row.timestamp,
		}));

	const columns: GridColDef[] = [
		{ field: "timestamp", headerName: "Date/Hour", flex: 1 },
		{ field: "event", headerName: "Event Type", flex: 1 },
		{ field: "pageUrl", headerName: "Page URL", flex: 1 },
		{ field: "adapter", headerName: "Adapter", flex: 1 },
		{ field: "creativeId", headerName: "Creative ID", flex: 1 },
		{ field: "cpm", headerName: "CPM", flex: 1 },
		{ field: "geo", headerName: "Geo", flex: 1 },
	];

	return (
		<div style={{ height: 600, width: "100%" }}>
			<h1 className="text-xl font-bold mb-4">Statistics</h1>
			<DataGrid
				rows={rowsWithId}
				columns={columns}
				pagination
				pageSizeOptions={[10]}
				initialState={{
					pagination: { paginationModel: { pageSize: 10, page: 0 } },
				}}
				loading={isLoading}
			/>
		</div>
	);
};

export default Stats;
