import { FaStar, FaRegStar } from "react-icons/fa";

const ProductCard = ({
  percentDisc,
  actualPrice,
  discountPrice,
  starRating,
  imageUrl,
  cardName,
  unit,
  onClick,
  totalReviews
}) => {
  const maxStars = 5;

  return (
    <div
      className="w-full max-w-xs border rounded-lg shadow-lg hover:shadow-xl overflow-hidden transition-shadow duration-300 bg-white cursor-pointer "
      onClick={onClick}
    >
      <div className="relative">
        {percentDisc && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded shadow-md">
            {percentDisc}
          </span>
        )}
        <img
          src={imageUrl}
          alt={cardName}
          className="w-full h-64 p-4 object-cover"
        />
      </div>

      <div className="p-4">
        <h3
          className="text-sm text-gray-800 truncate font-bold"
          title={cardName}
        >
          {cardName}
        </h3>

        <div className="flex items-center space-x-1 mt-1 text-yellow-400">
          {Array.from({ length: maxStars }).map((_, index) =>
            index < starRating ? (
              <FaStar key={index} size={12} />
            ) : (
              <FaRegStar key={index} size={12} />
            )
          )}
          <span className="text-xs text-gray-500 ml-1">({totalReviews})</span>
        </div>

        <div className="mt-2">
          <span className="line-through text-gray-500 text-xs">
            Rs.{actualPrice}
          </span>
          <span className="text-xl font-bold text-green-600 ml-2">
            Rs.{discountPrice}
          </span>
          {unit && (
            <p className="text-sm text-gray-500 mt-1 inline-block ml-1">
              per {unit}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
