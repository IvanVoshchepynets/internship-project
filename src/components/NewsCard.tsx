import { useNavigate } from "react-router-dom";

type NewsCardProps = {
  id: string; // це повний URL статті
  image?: string;
  title: string;
  preview?: string;
  description?: string;
};

export default function NewsCard({
  id,
  image,
  title,
  preview,
  description,
}: NewsCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${encodeURIComponent(id)}`);
  };

  return (
    <button
      type="button"
      className="w-full text-left border rounded overflow-hidden shadow hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={handleClick}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      ) : (
        <img
          src="/placeholder.png"
          alt="placeholder"
          className="w-full h-48 object-cover opacity-70"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">
          {preview ?? description ?? "Без опису"}
        </p>
      </div>
    </button>
  );
}
