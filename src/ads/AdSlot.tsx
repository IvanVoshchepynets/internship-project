interface AdSlotProps {
	width?: number;
	height?: number;
}

export default function AdSlot({ width = 300, height = 250 }: AdSlotProps) {
	return (
		<div
			id="div-gpt-ad-123"
			style={{
				width: `${width}px`,
				height: `${height}px`,
				background: "#f9f9f9",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<span style={{ fontSize: "12px", color: "#666" }}>Рекламний блок</span>
		</div>
	);
}
