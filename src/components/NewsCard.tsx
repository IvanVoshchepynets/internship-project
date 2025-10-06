import { useNavigate } from "react-router-dom";

type NewsCardProps = {
	id: string;
	image?: string;
	title: string;
	description: string;
};

export default function NewsCard({
	id,
	image,
	title,
	description,
}: NewsCardProps) {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			className="w-full text-left border rounded overflow-hidden shadow hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
			onClick={() => navigate(`/news/${encodeURIComponent(id)}`)}
		>
			{image && (
				<img src={image} alt={title} className="w-full h-48 object-cover" />
			)}
			<div className="p-4">
				<h2 className="text-lg font-semibold">{title}</h2>
				<p className="text-sm text-gray-600">{description}</p>
			</div>
		</button>
	);
}
