import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import Cookies from "js-cookie";
import { useAppSelector } from "../../utils/redux/Hooks";

const Navbar = () => {
  const Navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.CartSlice.itemsInCart);

  const onClickLogOutButton = () => {
    Cookies.remove("jwtToken");
    Navigate("/");
  };

  return (
    <>
      <div className="flex items-center p-5 justify-between pl-[50px] pr-[50px] bg-slate-100">
        <Link to={"/"}>
          <img
            className="w-[150px]"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="logo image"
          />
        </Link>
        <ul className="md:flex hidden items-center gap-5">
          <li className=" text-gray-800 cursor-pointer font-semibold text-lg">
            <Link className="text-inherit" to={"/"}>
              <p>Home</p>
            </Link>
          </li>
          <li className=" text-gray-800 cursor-pointer font-semibold text-lg">
            <Link className="text-inherit" to={"/products"}>
              <p>Product</p>
            </Link>
          </li>
          <li className=" text-gray-800 cursor-pointer font-semibold text-lg mr-5">
            <Link className="text-inherit" to={"/cart"}>
              <div>
                {cartItems.length > 0 && (
                  <div className=" relative w-0 h-0">
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 left-9 dark:border-gray-900">
                      {cartItems.length}
                    </div>
                  </div>
                )}
                <p>Cart</p>
              </div>
            </Link>
          </li>
          <li className=" text-gray-800 cursor-pointer font-semibold text-lg">
            <button
              onClick={() => onClickLogOutButton()}
              className=" bg-blue-500 text-white text-base"
            >
              Logout
            </button>
          </li>
        </ul>
        <CiLogout className="md:hidden w-10 h-10" />
      </div>
      <div className="md:hidden flex justify-between items-center bg-slate-100 p-5 pl-[50px] pr-[50px]">
        <Link className="text-inherit" to={"/"}>
          <FaHome className="w-8 h-8" />
        </Link>
        <Link className="text-inherit" to={"/products"}>
          <FaShoppingBag className="w-8 h-8" />
        </Link>
        <div>
          {cartItems.length > 0 && (
            <div className=" relative w-0 h-0">
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 left-8 dark:border-gray-900">
                {cartItems.length}
              </div>
            </div>
          )}
          <Link className="text-inherit" to={"/cart"}>
            <FaShoppingCart className="w-8 h-8" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
