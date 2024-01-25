import { useCookies } from "react-cookie";
import { Link, Navigate } from "react-router-dom";
import Header from "../Navbar/Navbar";

const Home = () => {
  const [cookies] = useCookies();
  const jwtToken = cookies.jwtToken;

  if (jwtToken === undefined) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Header />
      <div className="lg:flex lg:flex-row flex-col justify-center items-center h-[80vh] p-2 lg:p-5 pt-10 lg:pt-[150px]">
        <h1 className="font-bold lg:hidden text-center leading-[1.4]  lg:leading-[1.2] text-4xl">
          Clothes That Get You <br /> Noticed
        </h1>
        <div className="lg:hidden flex justify-center items-center">
          <img
            className="w-[300px]"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          />
        </div>
        <div className="lg:w-[600px]">
          <h1 className="hidden lg:flex font-bold  leading-[1.2]">
            Clothes That Get You <br /> Noticed
          </h1>
          <p className="pt-4 text-lg font-light text-center lg:text-left leading-[1.8]">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <div className="text-center lg:text-left">
            <Link className="text-inherit" to={"/products"}>
              <button className=" bg-blue-500 text-white mt-5">Shop Now</button>
            </Link>
          </div>
        </div>
        <div className="w-2/5 lg:flex hidden">
          <img
            className="ml-auto w-[500px]"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
