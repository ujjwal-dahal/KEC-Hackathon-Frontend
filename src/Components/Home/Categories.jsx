"use client";


import axios from "axios";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.60.253:8000/api/v1/public/product-app/categories"
        );
        console.log("Response Data:", response.data.results); 

        setCategories(response.data.results); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); 

  return (
    <div className="categories bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Product Categories</h3>

      <ul className="space-y-2">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={category.id} className="flex items-center">
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
                {category.name}
              </label>
            </li>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </ul>
    </div>
  );
};

export default Categories;
