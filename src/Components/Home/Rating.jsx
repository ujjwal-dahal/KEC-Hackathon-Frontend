import { FaStar, FaRegStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";

const Ratings = ({ onRatingSelect }) => {
  const [selectedRating, setSelectedRating] = useState(null); 
  const ratings = [5, 4, 3, 2, 1];

  // Handle rating change
  const handleRatingChange = (rating) => {
    if (selectedRating === rating) {
      setSelectedRating(null);
      onRatingSelect(null); 
    } else {
      setSelectedRating(rating);
      onRatingSelect(rating); 
    }
  };

  const handleClearFilter = () => {
    setSelectedRating(null);
    onRatingSelect(null); 
  };

  return (
    <div className="ratings bg-white p-4 rounded-lg mt-6">
      <h3 className="text-xl font-semibold mb-4 pl-2 border-l-4 border-yellow-400">
        Ratings
      </h3>

      <ul className="space-y-3">

        {ratings.map((stars) => (
          <li key={stars} className="flex items-center space-x-3">
            <input
              type="radio"
              id={`rating-${stars}`}
              name="rating"
              value={stars}
              checked={selectedRating === stars} 
              className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
              onChange={() => handleRatingChange(stars)} 
            />
            <label
              htmlFor={`rating-${stars}`}
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 cursor-pointer"
            >
              {Array.from({ length: 5 }, (_, starIndex) =>
                starIndex < stars ? (
                  <FaStar key={starIndex} className="text-yellow-400" />
                ) : (
                  <FaRegStar key={starIndex} className="text-gray-300" />
                )
              )}
            </label>
          </li>
        ))}
      </ul>

      <button
        className="mt-8 bg-red-500 border-2 border-transparent text-white px-5 py-2 rounded-lg hover:bg-transparent hover:border-2 hover:border-red-500 hover:text-red-500 transition-all duration-300"
        onClick={handleClearFilter}
      >
        Clear Filter
      </button>
    </div>
  );
};

Ratings.propTypes = {
  onRatingSelect: PropTypes.func,
};

Ratings.defaultProps = {
  onRatingSelect: () => {},
};

export default Ratings;
