

const Categories = () => {
  const categories = [
    "View All",
    "Staple Foods",
    "Grocery & Staples",
    "Organic Food",
    "Biscuits & Snacks",
    "Fresh Fruits",
    "Fruits & Vegetables",
  ];

  return (
    <div className="categories bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Categories</h3>

      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index} className="flex items-center">
            <input
              type="checkbox"
              id={`category-${index}`}
              name="category"
              value={category}
              className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
            />
            <label
              htmlFor={`category-${index}`}
              className="ml-2 text-sm font-medium text-gray-700"
            >
              {category}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
