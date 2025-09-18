import { Link } from "react-router-dom";

type NewsCardProps = {
	id: number;
	title: string;
	preview: string;
	image: string;
};

const NewsCard: React.FC<NewsCardProps> = ({ id, title, preview, image }) => {
	return (
		<Link
			to={`/news/${id}`}
			className="border rounded shadow hover:shadow-lg cursor-pointer overflow-hidden block"
		>
			<img src={image} alt={title} className="w-full h-40 object-cover" />
			<div className="p-4">
				<h2 className="font-bold text-lg mb-2">{title}</h2>
				<p className="text-sm text-gray-600">{preview}</p>
			</div>
		</Link>
	);
};

export default NewsCard;
