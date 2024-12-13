import { FaStar, FaRegStar } from "react-icons/fa";
import PropTypes from "prop-types";

const Ratings = ({ onRatingSelect }) => {
  const ratings = [5, 4, 3, 2, 1];

  const handleRatingChange = (rating) => {
    if (onRatingSelect) onRatingSelect(rating);
  };

  return (
    <div className="ratings bg-white p-4 rounded-lg  mt-6">
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
