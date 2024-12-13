"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Categories = ({ onCategoryChange = () => {} }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.137.1:8000/api/v1/public/product-app/categories"
        );
        setCategories(response.data.results);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    const updatedSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedSelectedCategories);
    onCategoryChange(updatedSelectedCategories.map((cat) => cat.name));
  };

  return (
    <div className="categories bg-white p-4 rounded-lg ">
      <h3 className="text-xl font-bold mb-4 pl-2 border-l-4 border-yellow-400">
        Product Categories
      </h3>
      <ul className="space-y-2">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                name="category"
                value={category.name}
                className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                onChange={() => handleCategoryChange(category)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm font-medium text-gray-700"
              >
                {category.name}
              </label>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
};

export default Categories;
