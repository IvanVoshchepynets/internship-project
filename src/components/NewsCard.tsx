import React from "react";

type NewsCardProps = {
  title: string;
  preview: string;
  image: string;
  onClick: () => void;
};

const NewsCard: React.FC<NewsCardProps> = ({ title, preview, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border rounded shadow hover:shadow-lg cursor-pointer overflow-hidden"
    >
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <p className="text-sm text-gray-600">{preview}</p>
      </div>
    </div>
  );
};

export default NewsCard;
