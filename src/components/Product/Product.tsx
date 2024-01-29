import React, { useEffect, useState } from "react";
import {
  getProductsThunk,
  setActionOptionId,
} from "../../utils/redux/ProductsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/redux/Hooks";
import { BsFilterRight } from "react-icons/bs";
import ProductCard from "../ProductCard/ProductCard";
import FilterTab from "../FilterTab/FilterTab";
import Header from "../Navbar/Navbar";
import { sortbyOptions } from "../../utils/productConstants/ProductConstants";
import { RootState } from "../../utils/redux/Store";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

export interface productInterface {
  id: number;
  title: string;
  image_url: string;
  brand: string;
  price: number;
  rating: number;
}

const Products = () => {
  const dispatch = useAppDispatch();
  const product: any = useAppSelector(
    (state: RootState) => state.productsSlice.products
  );

  const loading = useAppSelector((state) => state.productsSlice.loading);

  const [selectedOptionId, setSelectedOptionId] = useState(
    sortbyOptions[0].optionId
  );

  const [isFilterTabActive, setFilterTabActive] = useState(false);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const onChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOptionId(event.target.value);
    dispatch(setActionOptionId(event.target.value));
    dispatch(getProductsThunk());
  };

  return (
    <>
      <Header />
      <div className="p-5">
        <div className="flex">
          <div
            className={`${
              isFilterTabActive ? "" : "hidden"
            }  z-40 h-inherit flex-[1] md:hidden`}
          >
            <FilterTab />
          </div>
          <div className={`${`hidden md:block z-40 h-inherit flex-[1]`}`}>
            <FilterTab />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="p-5 flex-[5]">
              <div className="sticky top-0 flex flex-col lg:flex-row justify-between bg-white">
                <h1 className=" font-semibold text-lg lg:text-4xl lg:pb-5 lg:pt-5 lg:pl-5">
                  All Product
                </h1>
                <div className="flex justify-between items-center pt-5 pb-2">
                  <div className="flex flex-wrap gap-1 ">
                    <BsFilterRight className="h-[10px] w-[10px] md:h-5 md:w-5 mt-1 md:mr-2 md:block" />
                    <p className=" text-[10px] lg:text-lg lg:mr-2 p-1">
                      Sort By
                    </p>
                    <select
                      id="options"
                      value={selectedOptionId}
                      onChange={(event) => onChangeSortBy(event)}
                      className="outline-none cursor-pointer font-semibold text-sm lg:text-lg"
                    >
                      {sortbyOptions.map((eachOption) => {
                        return (
                          <option
                            className="text-sm"
                            id="options"
                            key={eachOption.optionId}
                            value={eachOption.optionId}
                          >
                            {eachOption.displayText}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button
                    onClick={() => setFilterTabActive(!isFilterTabActive)}
                    className="bg-blue-100 self-end text-black md:hidden text-sm px-5 py-1"
                  >
                    {isFilterTabActive ? "Close" : "Filter"}
                  </button>
                </div>
              </div>

              <ul
                className={`grid ${
                  isFilterTabActive ? "grid-cols-1" : "grid-cols-2"
                } md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`}
              >
                {product.products?.map((eachProduct: productInterface) => {
                  return (
                    <Link
                      className="text-inherit hover:text-inherit"
                      key={eachProduct.id}
                      to={`/product-details/${eachProduct.id}`}
                    >
                      <ProductCard product={eachProduct} />
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
