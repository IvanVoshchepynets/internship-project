interface AdSlotProps {
	id: string;
	width: number;
	height: number;
}

export default function AdSlot({ id, width, height }: AdSlotProps) {
	return (
		<div
			id={id}
			style={{
				width: `${width}px`,
				height: `${height}px`,
				background: "#f9f9f9",
			}}
		>
			<span style={{ fontSize: "12px", color: "#666" }}>Рекламний блок</span>
		</div>
	);
}
