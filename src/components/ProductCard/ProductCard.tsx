import React from "react";
import { productInterface } from "../Product/Product";
import { FaStar } from "react-icons/fa";

interface ProductCardProps {
  product: productInterface;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="p-5 shadow-2xl rounded-xl ">
      <img
        className=" rounded-md md:h-[250px] md:w-full"
        src={product?.image_url}
      />
      <p className=" border-b-2 pb-2 pt-2 font-semibold text-sm md:text-lg  mt-2 truncate">
        {product?.title}
      </p>
      <p className="text-sm md:text-lg font-normal mt-2">by {product?.brand}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="font-semibold text-sm md:text-xl">
          Rs {product?.price}/-
        </p>
        <p className=" flex items-center justify-center text-sm md:text-base md:w-[100px] p-2 md:p-2 rounded-lg text-white bg-blue-500 gap-2">
          {product?.rating} <FaStar />
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
