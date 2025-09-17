import { useParams, Link, useNavigate } from "react-router-dom";
import newsData from "../mock/news.json";

type NewsItem = {
  id: number;
  title: string;
  preview: string;
  image: string;
  content: string;
};

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const news = (newsData as NewsItem[]).find(
    (item) => item.id === Number(id)
  );

  if (!news) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Новину не знайдено</h1>
        <button
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
        className="w-full h-60 object-cover rounded mb-4"
      />
      <p className="text-gray-700 text-lg leading-relaxed">{news.content}</p>
    </div>
  );
};

export default NewsDetail;
