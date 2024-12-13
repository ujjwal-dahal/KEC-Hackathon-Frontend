"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/Components/Home/Card";
import Categories from "@/Components/Home/Categories";
import Ratings from "@/Components/Home/Rating";
import { FaSearch } from "react-icons/fa";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const fetchProducts = async (
    query = "",
    sort = "",
    rating = null,
    categories = []
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://192.168.137.1:8000/api/v1/public/product-app/products?search=${query}`
      );
      let productData = response.data.results;

      if (categories.length > 0) {
        productData = productData.filter((product) =>
          categories.includes(product.categoryName)
        );
      }

      if (rating) {
        productData = productData.filter(
          (product) => Math.round(product.averageRating) === rating
        );
      }

      if (sort === "lowToHigh") {
        productData = productData.sort((a, b) => a.offerPrice - b.offerPrice);
      } else if (sort === "highToLow") {
        productData = productData.sort((a, b) => b.offerPrice - a.offerPrice);
      }

      setProducts(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm, sortOption, selectedRating, selectedCategories);
  }, [searchTerm, sortOption, selectedRating, selectedCategories]);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <>
    <div className="container px-5 bg-yellow-400 text-black w-full h-20 flex justify-center items-center font-bold text-3xl">Shop Page</div>
    <div className="main-container grid grid-cols-12 gap-8 px-6 py-8 bg-gray-50">
      <div className="col-span-3 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-yellow-400 mb-4 bg-black p-3 text-center w-full rounded-t-3xl ">Filters</h2>
        <Categories onCategoryChange={handleCategoryChange} />
        <Ratings onRatingSelect={setSelectedRating} />
      </div>

      <div className="col-span-9">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Sort By</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-600">
              <p>Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                percentDisc={`${Math.round(
                  ((product.price - product.offerPrice) / product.price) * 100
                )}%`}
                actualPrice={`${product.price}`}
                discountPrice={`${product.offerPrice}`}
                starRating={Math.round(product.averageRating)}
                imageUrl={
                  product.featuredImage || "/defaultImage/defaultImage.avif"
                }
                cardName={product.name}
                unit={product.unit}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              <p>No products available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
</>
  );
};

export default Shop;
