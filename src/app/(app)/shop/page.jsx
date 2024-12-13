"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/Components/Home/Card";
import Categories from "@/Components/Home/Categories";
import Ratings from "@/Components/Home/Rating";
import { FaSearch } from "react-icons/fa";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async (query = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://192.168.60.253:8000/api/v1/public/product-app/products?search=${query}`
      );
      const productData = response.data.results;
      setProducts(productData);
      // console.log(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
      fetchProducts(searchTerm);
  }, [searchTerm]);

  return (
    <div className="main-container grid grid-cols-12 gap-4 p-6">
      <div className="col-span-3">
        <Categories />
        <Ratings />
      </div>

      <div className="col-span-9">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search Items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <select className="p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="new">New Arrival</option>
              <option value="popular">Popular</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center">
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
                starRating={4}
                imageUrl={product.featuredImage || "/defaultImage/defaultImage.avif"}
                cardName={product.name}
                unit={product.unit}
              />
            ))
          ) : (
            <div className="col-span-full text-center">
              <p>No products available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
