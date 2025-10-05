import { useQuery } from "@tanstack/react-query";
import { useEffect, useId } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdSlot from "../ads/AdSlot";
import newsData from "../mock/news.json";
import { sendStat } from "../stats/statsModule";

type NewsItem = {
	id: number;
	title: string;
	preview: string;
	image: string;
	content: string;
};

const fetchNewsById = async (id: string): Promise<NewsItem | undefined> => {
	const news = newsData as NewsItem[];
	return news.find((item) => item.id === Number(id));
};

const NewsDetail = () => {
	const adId2 = useId();
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const {
		data: news,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["news", id],
		queryFn: () => fetchNewsById(id!),
		enabled: !!id,
	});

	useEffect(() => {
		if (id) sendStat("openNewsDetail", { id });
	}, [id]);

	if (isLoading) return <div className="p-6">Завантаження...</div>;
	if (error)
		return <div className="p-6 text-red-500">Помилка завантаження</div>;
	if (!news) {
		return (
			<div className="p-6">
				<h1 className="text-xl font-bold">Новину не знайдено</h1>
				<button
					type="button"
					onClick={() => navigate(-1)}
					className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
				>
					Назад
				</button>
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto p-6">
			<Link to="/news" className="text-blue-600 underline">
				Назад до стрічки
			</Link>

			<h1 className="text-3xl font-bold mt-4 mb-2">{news.title}</h1>
			<img
				src={news.image}
				alt={news.title}
				loading="lazy"
				className="w-full h-60 object-cover rounded mb-4"
			/>
			<p className="text-gray-700 text-lg leading-relaxed">{news.content}</p>
			{import.meta.env.VITE_ENABLE_ADS === "true" && (
				<div className="container mx-auto p-4">
					<AdSlot id={adId2} width={300} height={600} />
				</div>
			)}
		</div>
	);
};

export default NewsDetail;
