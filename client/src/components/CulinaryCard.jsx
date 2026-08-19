import React from "react";
import { Eye, Calendar } from "lucide-react";

const CulinaryCard = ({
  image,
  title,
  category,
  description,
  date,
  views,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col justify-between overflow-hidden rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer"
    >
      <div>
        {/* Container Gambar */}
        <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute left-2.5 top-2.5 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#6B2E1E] backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Konten Teks */}
        <div className="mt-3">
          <h3 className="text-sm font-bold text-gray-800 transition group-hover:text-[#6B2E1E] line-clamp-1">
            {title}
          </h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Footer Kartu */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-[11px] text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye size={12} />
          <span>{views} views</span>
        </div>
      </div>
    </div>
  );
};

export default CulinaryCard;