import { useNavigate } from "react-router-dom";

interface NewsCardProps {
	id: string;
	title: string;
	preview: string;
	image?: string;
}

const NewsCard = ({ id, title, preview, image }: NewsCardProps) => {
	const navigate = useNavigate();

	return (
		<div
			className="border rounded overflow-hidden shadow hover:shadow-lg cursor-pointer"
			onClick={() => navigate(`/news/${encodeURIComponent(id)}`)}
		>
			{image && (
				<img
					src={image}
					alt={title}
					loading="lazy"
					className="w-full h-40 object-cover"
				/>
			)}
			<div className="p-4">
				<h2 className="text-lg font-bold mb-2">{title}</h2>
				<p className="text-gray-600">{preview}</p>
			</div>
		</div>
	);
};

export default NewsCard;
