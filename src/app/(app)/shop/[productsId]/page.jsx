"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";

const ProductDescription = () => {
  const { productsId } = useParams();
  const [product, setProduct] = useState(null);
  const [farmerData, setFarmerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [farmerId, setFarmerId] = useState("");
  const [farmerInfo, setFarmerInfo] = useState(null);

  const [reviewData, setReviewData] = useState({
    rating: "",
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (event) => {
    setReviewData((prevData) => {
      let updatedData = {
        ...prevData,
        [event.target.name]: event.target.value,
      };

      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    // console.log(reviewData)
    e.preventDefault();
  };

  // Fetch product data and farmer data
  useEffect(() => {
    const fetchProductAndFarmerData = async () => {
      try {
        setLoading(true);

        // Fetch product data
        const productResponse = await axios.get(
          `http://192.168.137.1:8000/api/v1/public/product-app/products/${productsId}`
        );
        const productData = productResponse.data;
        setProduct(productData);

        // If farmerId exists, fetch farmer data
        if (productData?.farmer != null) {
          setFarmerData(productData.farmer);
          console.log(productData.farmer);
        }

        if (farmerId) {
          try {
            const farmerResponse = await axios.get(
              `http://192.168.137.1:8000/api/v1/public/business-app/business-info/${farmerId}`
            );
            setFarmerInfo(farmerResponse.data.farmer);
          } catch (farmerError) {
            if (farmerError.response?.status === 404) {
              setFarmerInfo(null);
            } else {
              throw farmerError;
            }
          }
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    if (productsId) {
      fetchProductAndFarmerData();
    }
  }, [productsId]);

  // Temporary Additional Info & Reviews
  const additionalInfo = {
    brandModel: "Casio G-Shock GA2100",
    displayType: "Analog-Digital with LED backlight",
    material: "Durable resin case and strap",
    waterResistance: "Up to 200 meters",
    specialFeatures:
      "Shock-resistant, world time, stopwatch, and countdown timer",
    batteryLife: "Approximately 3 years on CR2016 battery",
  };

  const reviews = [
    {
      id: 1,
      name: "Marcus Jones",
      rating: 5,
      review:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.",
    },
    {
      id: 2,
      name: "Marcus Jones",
      rating: 3,
      review:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.",
    },
  ];

  const handleLocateSeller = () => {
    if (farmerData?.location) {
      const locationUrl = `https://www.google.com/maps?q=${farmerData.location.lat},${farmerData.location.lng}`;
      window.open(locationUrl, "_blank");
    }
  };

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      {/* Product Info */}
      <div className="min-h-72 bg-gray-50 flex items-center justify-center px-6 py-7">
        <div className="w-full sm:w-1/2 lg:w-1/3 flex justify-center items-center p-6 sm:p-8">
          <img
            src={product?.featuredImage || "/defaultImage/defaultImage.avif"}
            alt={product?.name || "Product Image"}
            className="h-4/6 w-4/6 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="max-w-4xl bg-transparent rounded-lg overflow-hidden flex flex-col sm:flex-row w-full sm:w-1/2 lg:w-2/3 p-6 sm:p-10 -ml-24">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-black mb-6 capitalize pl-2 border-l-8 border-yellow-400">
                {product?.name || "Product Name"}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {product?.description ||
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}
              </p>
            </div>

            <div className="mt-10">
              <div className="flex items-center space-x-6 relative">
                <span className="text-2xl sm:text-3xl font-semibold text-black">
                  NRs {product?.originalPrice || 1000}
                </span>
                <span className="line-through text-gray-400 text-lg absolute bottom-5 left-32">
                  NRs {product?.price || 400}
                </span>
                <p className="text-sm text-gray-500 mt-2 absolute -bottom-5 left-32">
                  per kg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer details section */}
      {farmerData && (
        <>
          <div className="min-h-72 bg-gray-100 flex items-center rounded-xl mb-10 justify-center mx-48 py-2">
            <div className="w-full sm:w-1/2 lg:w-1/3 flex justify-center items-center p-6 sm:p-8">
              <img
                src={farmerData?.photo || "/defaultImage/defaultImage.avif"}
                alt={farmerData?.name || "Farmer Image"}
                className="h-40 w-40 object-cover rounded-full border-4 border-yellow-400"
              />
            </div>
            <div className="max-w-4xl bg-transparent rounded-lg overflow-hidden flex flex-col sm:flex-row w-full sm:w-1/2 lg:w-2/3 p-6 sm:p-10 -ml-24">
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-black mb-6 capitalize pl-2 border-l-8 border-yellow-400">
                    Farmer Info
                  </h1>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    <p>
                      <strong>Name:</strong>{" "}
                      {farmerData?.fullName || "Farmer's Name"}{" "}
                    </p>
                    <p>
                      <strong>Contact:</strong> {farmerData?.contactNo || "N/A"}{" "}
                    </p>
                    <p>
                      <strong>Business Type:</strong>{" "}
                      {farmerData?.businessType || "N/A"}{" "}
                    </p>
                    <p>
                      <strong>Background Story:</strong>{" "}
                      {farmerData?.backgroundStory || "No story available."}
                    </p>
                  </p>
                </div>

                {/* Location and Map */}
                <div className="mt-6">
                  {farmerData?.location ? (
                    <button
                      onClick={handleLocateSeller}
                      className="px-4 py-2 bg-black text-white rounded-md"
                    >
                      Locate Seller
                    </button>
                  ) : (
                    <p className="text-gray-500">Location not available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Additional Info & Reviews */}
      <div className="p-6 font-sans bg-gray-50 mx-44 flex gap-7">
        {/* Additional Info Section */}
        {farmerInfo && (
          <>
            <div className="mb-10 bg-white shadow-lg rounded-lg p-6 w-1/2 ">
              <h2 className="text-black uppercase text-2xl font-bold border-b-4 border-yellow-400 pb-2 mb-4 inline-block">
                business into :
              </h2>

              <ul className="list-none space-y-4">
                {Object.entries(additionalInfo).map(([key, value], index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <span className="font-semibold w-40 uppercase text-sm text-gray-600">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </span>
                      <span className="ml-2 text-gray-800 text-base">
                        {value}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Reviews Section */}
        <div className="mb-10 bg-white shadow-lg rounded-lg p-6 w-1/2">
          <h2 className="text-black text-2xl font-bold border-b-4 border-yellow-400 pb-2 mb-4 inline-block">
            REVIEWS :
          </h2>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-whiterounded-lg p-6 mb-6 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-[200px]">
                <img
                  src={review.image || "/defaultImage/unknownImage.jpg"}
                  alt={review.name}
                  className="rounded-full w-16 h-16 object-cover border-2 border-yellow-400 shadow-md"
                />
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold text-lg mb-2">
                  {review.name || "Anonymous"}
                </h3>

                <div className="mb-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {review.review || "No review provided."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Section */}

      <div className="flex justify-center items-center bg-gray-50 mb-20">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Write a Review
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-gray-700 font-medium mb-2"
              >
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() =>
                      setReviewData((prevData) => ({
                        ...prevData,
                        rating: star,
                      }))
                    }
                    className="cursor-pointer"
                  >
                    {reviewData.rating >= star ? (
                      <FaStar className="text-yellow-400 text-2xl" />
                    ) : (
                      <FaRegStar className="text-gray-300 text-2xl" />
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={reviewData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={reviewData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Write your review here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={reviewData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-black transition-all duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
