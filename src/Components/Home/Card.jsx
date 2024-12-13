import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { FaStar, FaRegStar } from "react-icons/fa";

const ProductCard = ({
  percentDisc,
  actualPrice,
  discountPrice,
  starRating,
  imageUrl,
  cardName,
  unit,
}) => {
  const maxStars = 5;

  return (
    <Card className="w-64 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="relative flex justify-center">
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
            {percentDisc}
          </span>
          <img
            src={imageUrl}
            alt={cardName}
            className="w-full h-40 object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <CardTitle className="text-lg font-bold">{cardName}</CardTitle>
        <CardDescription>
          <span className="line-through text-gray-500">Rs.{actualPrice}</span>{" "}
          <span className="text-green-600 text-xl font-bold">Rs.{discountPrice}</span>
          <span className="text-black font-bold"> per {unit}</span>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full space-x-1 text-yellow-400">
          {Array.from({ length: maxStars }).map((_, index) =>
            index < starRating ? (
              <FaStar key={index} />
            ) : (
              <FaRegStar key={index} />
            )
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
