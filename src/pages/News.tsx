import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import newsData from "../mock/news.json";

type NewsItem = {
  id: number;
  title: string;
  preview: string;
  image: string;
  content: string;
};

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // замокані дані, імітація завантаження
    setNews(newsData as NewsItem[]);
  }, []);

  const handleNewsClick = (id: number) => {
    console.log("Відкрити новину:", id);
    // тут пізніше буде модалка або редірект на /news/:id
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Стрічка новин</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            preview={item.preview}
            image={item.image}
            onClick={() => handleNewsClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default News;
