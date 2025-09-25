import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AdSlot from "../ads/AdSlot";
import Button from "../components/Button";
import NewsCard from "../components/NewsCard";

type NewsItem = {
	id: string;
	title: string;
	link: string;
	preview: string;
	pubDate: string;
};

const fetchNews = async (): Promise<NewsItem[]> => {
	const res = await fetch("http://localhost:3000/feed");
	if (!res.ok) throw new Error("Помилка при завантаженні новин");
	return res.json();
};

const News = () => {
	const navigate = useNavigate();
	const {
		data: news = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["news"],
		queryFn: fetchNews,
	});

	const handleLogout = () => {
		localStorage.removeItem("username");
		navigate("/");
	};

	if (isLoading) return <div className="p-6">Завантаження...</div>;
	if (error)
		return <div className="p-6 text-red-500">Не вдалося отримати новини</div>;

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Стрічка новин</h1>
				<AdSlot id="div-gpt-ad-728x90" width={728} height={90} />
				<Button onClick={handleLogout}>Вийти</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{news.map((item) => (
					<NewsCard
						key={item.link}
						id={item.link}
						title={item.title}
						preview={item.preview}
						image="/placeholder.png"
					/>
				))}
			</div>
		</div>
	);
};

export default News;
