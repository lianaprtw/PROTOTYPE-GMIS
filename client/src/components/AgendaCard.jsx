import { MapPin } from "lucide-react";

const AgendaCard = ({
  image,
  category = "FESTIVAL",
  title,
  location,
  description,
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-[130px] w-full object-cover"
      />

      {/* Content */}
      <div className="p-3">

        {/* Category */}
        <span className="text-[10px] font-semibold text-[#6B2E1E]">
          {category}
        </span>

        {/* Title */}
        <h3 className="mt-1 text-sm font-semibold text-[#24140F]">
          {title}
        </h3>

        {/* Location */}
        <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
          <MapPin size={11} />
          {location}
        </p>

        {/* Description */}
        <p className="mt-2 text-[10px] leading-4 text-gray-500">
          {description}
        </p>

        {/* Button */}
        <button
          type="button"
          className="mt-4 w-full rounded bg-[#6B2E1E] py-2 text-[9px] font-semibold text-white transition hover:bg-[#542317]"
        >
          View Detail
        </button>

      </div>
    </div>
  );
};

export default AgendaCard;