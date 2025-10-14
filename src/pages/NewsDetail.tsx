import { useQuery } from "@tanstack/react-query";
import { useEffect, useId } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdSlot from "../ads/AdSlot";
import { sendStat } from "../stats/statsModule";

type Article = {
  title: string;
  content: string[];
  image?: string | string[];
};

const fetchArticleByUrl = async (url: string): Promise<Article> => {
  const res = await fetch(
    `http://localhost:3000/article?url=${encodeURIComponent(url)}`
  );
  if (!res.ok) throw new Error("Не вдалося отримати статтю");
  return res.json();
};

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticleByUrl(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (id) sendStat("openNewsDetail", { id });
  }, [id]);

  if (isLoading) return <div className="p-6">Завантаження...</div>;
  if (error)
    return <div className="p-6 text-red-500">Не вдалося отримати статтю</div>;
  if (!article)
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Статтю не знайдено</h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Назад
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/news" className="text-blue-600 underline">
        Назад до стрічки
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-4">{article.title}</h1>

      {Array.isArray(article.image) ? (
        article.image.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={article.title}
            loading="lazy"
            className="w-full h-60 object-cover rounded mb-4"
          />
        ))
      ) : article.image ? (
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-60 object-cover rounded mb-4"
        />
      ) : null}

      {article.content.map((p, i) => (
        <p key={i} className="text-gray-700 text-lg leading-relaxed mb-2">
          {p}
        </p>
      ))}

      {import.meta.env.VITE_ENABLE_ADS === "true" && (
        <div className="container mx-auto p-4">
          <AdSlot width={300} height={600} />
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
