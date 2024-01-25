import { FaSearch } from "react-icons/fa";
import {
  categoryOptions,
  ratingsList,
} from "../../utils/productConstants/ProductConstants";
import { useAppDispatch } from "../../utils/redux/Hooks";
import {
  getProductsThunk,
  setActiveRatingId,
  setCategory,
  setSearchInput,
  clearFilters,
} from "../../utils/redux/ProductsSlice";
import { useState } from "react";

const FilterTab = () => {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInputInUseState] = useState("");

  const onClickCategory = (id: String) => {
    dispatch(setCategory(id));
    dispatch(getProductsThunk());
  };

  const onClickRating = (id: String) => {
    dispatch(setActiveRatingId(id));
    dispatch(getProductsThunk());
  };

  const onClickSearchInput = (event) => {
    if (event.key === "Enter") {
      dispatch(setSearchInput(searchInput));
      setSearchInputInUseState("");
      dispatch(getProductsThunk());
    }
  };

  const onClickClearFilters = () => {
    dispatch(clearFilters());
    dispatch(getProductsThunk());
  };

  return (
    <div className="sticky top-10 bg-white flex-[1]">
      <div className="flex w-[120px] md:w-[200px] items-center border p-1 rounded-md bg-slate-200 mb-2">
        <input
          className="outline-none text-sm bg-inherit w-[100px] md:w-[200px]"
          type="search"
          placeholder="Search"
          onChange={(event) => setSearchInputInUseState(event.target.value)}
          onKeyDown={(event) => onClickSearchInput(event)}
        />
        <FaSearch className=" text-gray-500" />
      </div>
      <div>
        <h2 className="font-bold text-base md:text-lg">Category</h2>
        <ul className="grid grid-cols-1 gap-2 mt-2">
          {categoryOptions.map((eachCategory, i) => {
            return (
              <li
                className=" cursor-pointer text-sm md:text-lg"
                onClick={() => onClickCategory(eachCategory.categoryId)}
                key={i}
              >
                <p className=" font-normal ">{eachCategory.name}</p>
              </li>
            );
          })}
        </ul>
        <h2 className="font-bold text-lg mt-5">Rating</h2>
        <ul className="grid grid-cols-1 gap-4 mt-4">
          {ratingsList.map((eachCategory, i) => {
            return (
              <li
                className="cursor-pointer"
                onClick={() => onClickRating(eachCategory.ratingId)}
                key={i}
              >
                <img
                  className=" w-[100px] md:w-[150px]"
                  src={eachCategory.imageUrl}
                />
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => onClickClearFilters()}
          className="text-blue-500 bg-white text-sm md:text-lg border-blue-500 p-2 rounded-lg mt-[100px] "
        >
          Clear FIlters
        </button>
      </div>
    </div>
  );
};

export default FilterTab;
