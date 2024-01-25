import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      username: userName,
      password,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
    };

    const response = await fetch("https://apis.ccbp.in/login", options);
    const responseData = await response.json();

    if (response.ok === true) {
      const jwtToken = responseData.jwt_token;
      Cookies.set("jwtToken", jwtToken);
      navigate("/", { replace: true });
    } else {
      setIsError(true);
      setErrorMsg(responseData.error_msg);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center p-5">
      <div className="w-[550px] p-5 mr-5 hidden lg:flex">
        <img
          className=""
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
        />
      </div>
      <form
        onSubmit={onSubmitForm}
        className="ml-5 sm:ml-0 shadow-2xl rounded-md shadow-black/40  flex flex-col justify-center p-5 w-[400px] h-[400px]"
      >
        <img
          className="w-[200px] self-center"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website login"
        />
        <div className="flex flex-col p-2">
          <label
            className="font-semibold tracking-wider text-base mt-5"
            htmlFor="username"
          >
            USERNAME
          </label>
          <input
            className=" bg-slate-300 p-2 outline-none mt-2 text-sm tracking-tight rounded-sm"
            type="text"
            id="username"
            placeholder="USERNAME"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            className="font-semibold tracking-wider text-base mt-5"
            htmlFor="password"
          >
            PASSWORD
          </label>
          <input
            className=" bg-slate-300 p-2 outline-none mt-2 tracking-tight text-sm rounded-sm"
            type="password"
            id="password"
            placeholder="PASSWORD"
            onChange={(e) => setPassword(e.target.value)}
          />
          {isError && (
            <p className="text-sm text-red-500 font-semibold mt-2">
              *{errorMsg}
            </p>
          )}
          <button
            type="submit"
            className=" bg-blue-600 text-white text-base mt-5 outline-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
