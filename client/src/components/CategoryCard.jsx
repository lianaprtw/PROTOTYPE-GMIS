import { ArrowRight } from "lucide-react";

const CategoryCard = ({
  icon: Icon,
  title,
  description,
  items,
  bgColor = "bg-[#F8F0E7]",
}) => {
  return (
    <div
      className={`relative flex h-[172px] flex-col rounded-xl ${bgColor} p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md`}
    >
      {/* Icon */}
      <div className="flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/60">
          <Icon
            size={25}
            strokeWidth={1.8}
            className="text-[#6B2E1E]"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-center text-sm font-semibold text-[#4B2417]">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 line-clamp-3 text-center text-[10px] leading-4 text-gray-600">
        {description}
      </p>

      {/* Bottom */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-[10px] text-gray-600">
          {items} Items
        </span>

        {/* Arrow Button */}
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-full border border-[#4B2417]/60 text-[#4B2417] transition hover:bg-[#4B2417] hover:text-white"
        >
          <ArrowRight size={13} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;