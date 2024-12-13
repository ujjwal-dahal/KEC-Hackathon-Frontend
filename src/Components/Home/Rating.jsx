import { FaStar, FaRegStar } from "react-icons/fa"; 

const Ratings = () => {
  const ratings = [5, 4, 3, 2, 1]; 

  return (
    <div className="ratings bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold mb-4">Ratings</h3>

      <ul className="space-y-3">
        {ratings.map((stars, index) => (
          <li key={index} className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={`rating-${stars}`}
              name="rating"
              value={stars}
              className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
            />
            <label
              htmlFor={`rating-${stars}`}
              className="flex items-center space-x-1 text-sm font-medium text-gray-700"
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

export default Ratings;
