import { useAppDispatch, useAppSelector } from "../../utils/redux/Hooks";
import { IoIosClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Header from "../Navbar/Navbar";
import {
  decreaseItemInCart,
  increaseItemInCart,
  removeAllItems,
  removeItem,
} from "../../utils/redux/CartSlice";
import { useEffect, useState } from "react";

const Cart = () => {
  const products = useAppSelector((state) => state.CartSlice.itemsInCart);
  const [totalAmout, setTotalAmount] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let totalAmount = 0;
    products.forEach((item) => {
      let amount = item.product.price * item.count;
      totalAmount += amount;
    });
    setTotalAmount(totalAmount);
  }, [products]);

  console.log(products);
  return (
    <>
      <Header />
      {products.length > 0 ? (
        <>
          <div className="lg:pl-[50px] lg:pr-[50px] pt-[40px]">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-black/75">My Cart</h1>
            </div>

            <ul className="pt-[20px]">
              <div className="text-right">
                <button
                  onClick={() => dispatch(removeAllItems())}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Remove All
                </button>
              </div>
              {products.map((eachProduct, index) => {
                return (
                  <li key={index} className="mt-4 mb-4 border">
                    <div className="flex justify-between items-center h-36 shadow-md gap-2 md:gap-5  p-2 ">
                      <div className="flex flex-[3]">
                        <img
                          className="w-[80px] md:w-[100px]"
                          alt={eachProduct.product?.title}
                          src={eachProduct.product?.image_url}
                        />
                        <div className="ml-2 md:ml-4 flex flex-col justify-center">
                          <p className=" font-semibold text-sm md:text-xl">
                            {eachProduct.product?.title}
                          </p>
                          <p className="text-sm md:pt-2 pt-1 text-black/50">
                            by {eachProduct.product?.brand}
                          </p>
                        </div>
                      </div>
                      <div className="md:flex-1">
                        <div className="font-semibold text-sm md:text-lg ">
                          <button
                            onClick={() =>
                              dispatch(decreaseItemInCart(eachProduct.product))
                            }
                            className="border-1 border-solid border-black/20 p-1 rounded-none md:pr-[10px] md:pl-[10px] mr-2 md:mr-4"
                          >
                            -
                          </button>
                          <span className="text-blue-500">
                            {eachProduct.count}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(increaseItemInCart(eachProduct.product))
                            }
                            className="border-1 border-solid border-black/20 p-1 rounded-none md:pr-[10px] md:pl-[10px] ml-2 md:ml-4"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-blue-500 font-semibold text-sm md:text-xl">
                          Rs. {eachProduct.product?.price * eachProduct?.count}
                          /-
                        </p>
                      </div>
                      <div className="md:p-5">
                        <button
                          onClick={() =>
                            dispatch(removeItem(eachProduct.product))
                          }
                          className="p-0 md:p-5 bg-inherit"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex justify-end items-center g:pl-[50px] lg:pr-[50px] pt-[40px]">
            <div className="max-w-[400px] flex flex-col">
              <p className="font-bold text-lg md:text-2xl m-0 p-0">
                Order Total :
                <span className="text-2xl md:text-4xl"> {totalAmout}</span>
              </p>
              <p className="m-0 p-0">
                {products.length} item{products.length > 1 ? "s" : ""} in cart
              </p>
              <button
                type="button"
                className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="h-[80vh] flex justify-center items-center">
          <h1>No items in cart</h1>
        </div>
      )}
    </>
  );
};

export default Cart;
