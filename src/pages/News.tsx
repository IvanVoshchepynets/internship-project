import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdSlot from "../ads/AdSlot";
import Button from "../components/Button";
import NewsCard from "../components/NewsCard";
import { sendStat } from "../stats/statsModule";

type NewsItem = {
  id?: string;
  title: string;
  link: string;
  preview: string;
  pubDate: string;
  image?: string;
};

const fetchNews = async (): Promise<NewsItem[]> => {
  const res = await fetch("http://localhost:3000/feed");
  if (!res.ok) throw new Error("Помилка при завантаженні новин");

  const data = await res.json();

  const items = Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : [];

  return items.map((item: any, index: number) => ({
    id: item.link || String(index),
    title: item.title || "Без назви",
    link: item.link || "#",
    preview: item.preview || item.description || "Без опису",
    pubDate: item.pubDate
      ? new Date(item.pubDate).toLocaleString("uk-UA", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Невідома дата",
    image: item.enclosure?.link || item.thumbnail || "/placeholder.png",
  }));
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

  useEffect(() => {
    sendStat("openNewsPage");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    sendStat("logout");
    navigate("/");
  };

  if (isLoading) return <div className="p-6">Завантаження...</div>;
  if (error)
    return <div className="p-6 text-red-500">Не вдалося отримати новини</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Стрічка новин</h1>

        {import.meta.env.VITE_ENABLE_ADS === "true" && (
          <div className="container mx-auto p-4">
            <AdSlot width={728} height={90} />
          </div>
        )}

        <Button onClick={handleLogout}>Вийти</Button>
      </div>

      {news.length === 0 ? (
        <div className="text-gray-500">Новин поки що немає</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard
  key={item.link}
  id={item.link}
  title={item.title}
  preview={`${item.preview} — ${item.pubDate}`}
  image={item.image} 
/>

          ))}
        </div>
      )}
    </div>
  );
};

export default News;
