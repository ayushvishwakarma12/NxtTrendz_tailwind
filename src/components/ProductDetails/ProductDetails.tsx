import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/redux/Hooks";
import { RootState } from "../../utils/redux/Store";
import { getPoductDetailsThunk } from "../../utils/redux/ProductDetailsSlice";
import Header from "../Navbar/Navbar";
import { FaStar } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";
import { productInterface } from "../Product/Product";
import { addToCart } from "../../utils/redux/CartSlice";
import Loader from "../Loader/Loader";

const ProductDetails: React.FC = (): JSX.Element => {
  const [itemCount, setItemCount] = useState(1);
  const [errorMsg, setErrorMsg] = useState(false);

  const params = useParams();
  const { id }: any = params;

  const dispatch = useAppDispatch();
  const { productDetails, loading, error }: any = useAppSelector(
    (state: RootState) => state.ProductDetailsSlice
  );
  const cartItems: any = useAppSelector((state: RootState) => state.CartSlice);
  console.log(cartItems);

  useEffect(() => {
    dispatch(getPoductDetailsThunk(id));
  }, []);

  const onClickAddToCartButton = (
    productDetails: productInterface,
    itemCount: number
  ) => {
    if (itemCount === 0) {
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
      dispatch(addToCart({ product: productDetails, count: itemCount }));
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div className="p-5 flex flex-col items-center">
          <div className="  max-w-[1200px]">
            <div className="flex md:flex-row flex-col  gap-10">
              <div className="rounded-2xl overflow-hidden  flex-[1]">
                <img
                  className=" object-cover rounded-2xl"
                  alt={productDetails?.title}
                  src={productDetails?.image_url}
                />
              </div>
              <div className="flex flex-col flex-[1]">
                <h1 className="text-2xl md:text-4xl font-bold  text-black/75">
                  {productDetails?.title}
                </h1>
                <p className="text-xl md:text-2xl  font-semibold pt-4 pb-4">
                  Rs {productDetails?.price} /-
                </p>
                <div className="flex gap-5 pt-4 pb-4">
                  <div className="flex justify-center items-center bg-blue-500 text-white text-sm md:text-base font-semibold w-20 p-2 rounded-md">
                    <p className="pr-2 ">{productDetails?.rating}</p>
                    <FaStar className="pb-[1px]" />
                  </div>
                  <p className="font-semibold text-sm md:text-lg pt-2">
                    {productDetails?.total_reviews} Reviews
                  </p>
                </div>
                <p className="md:w-4/5 text-sm md:text-lg md:leading-7 text-black/65 font-[500]">
                  {productDetails?.description}
                </p>
                <div className="pt-4 pb-4 text-sm md:text-lg">
                  <span className="font-bold">Availability : </span>
                  <span>{productDetails?.availability}</span>
                </div>
                <div className="text-black/65 text-sm md:text-lg">
                  <span className="font-bold">Brand : </span>
                  <span>{productDetails?.brand}</span>
                </div>
                <hr className="mt-5 border-1 mb-5" />
                <div>
                  <button
                    disabled={itemCount < 1 ? true : false}
                    onClick={() =>
                      setItemCount(itemCount > 0 ? itemCount - 1 : 0)
                    }
                    className="border-1 border-solid border-black/20 p-1 rounded-none pr-[10px] pl-[10px] mr-4"
                  >
                    -
                  </button>
                  <span>{itemCount}</span>
                  <button
                    onClick={() => setItemCount(itemCount + 1)}
                    className="border-1 border-solid border-black/20 p-1 rounded-none pr-[10px] pl-[10px] ml-4"
                  >
                    +
                  </button>
                </div>

                <div className="mt-[30px] bg-blue-500 text-white text-sm md:text-base font-semibold p-2 rounded-md self-start flex justify-center items-center pr-4 pl-4">
                  <button
                    className="text-inherit bg-inherit focus:outline-none pr-2 outline-none outline-0 border-none "
                    onClick={() =>
                      onClickAddToCartButton(productDetails, itemCount)
                    }
                  >
                    Add To Cart
                  </button>
                </div>
                {errorMsg && (
                  <p className="mt-2 text-red-500 font-semibold text-sm">
                    *Please select minimum one quantity
                  </p>
                )}
              </div>
            </div>
            <div className="max-w-[1200px] mt-10">
              <h1 className="font-semibold text-black/75 text-lg md:text-[40px] pb-5">
                Similar Product
              </h1>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-5 lg:grid-cols-4 ">
                {productDetails?.similar_products?.map(
                  (eachProduct: productInterface, index: number) => {
                    return (
                      <li key={index} className=" max-w-[300px] max-h-[500px] ">
                        <ProductCard product={eachProduct} />
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
