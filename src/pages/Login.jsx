import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { validateLoginForm } from "../utils/validateForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faTriangleExclamation,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();
  const { user, setUser, login } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //   try {
  //     const { data } = await axiosInstance.post("/api/v1/user/login", formdata);
  //     const { data: userData } = await axiosInstance.get(
  //       "/api/v1/user/current"
  //     );
  //     setUser(userData);
  //     localStorage.setItem("userInfo", JSON.stringify(userData));
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //     alert(error?.response?.data?.message ?? "login failed");
  //   }
  // };

  // useEffect(() => {
  //   if (!user) {
  //     navigate(-1);
  //     return;
  //   }
  // }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateLoginForm(formData);
    if (Object.keys(errors).length === 0) {
      login(formData)
        .then(() => navigate("/"))
        .catch((error) => {
          console.error(error);
          alert(error?.response?.data?.message ?? "login failed");
        });
    } else {
      setErrors(errors);
    }
  };
  return (
    <div className="flex justify-center my-9 form-container dark:text-white">
      <div className="form">
        <p className="mb-4">Welcome back</p>
        <h1 className="mb-2 text-2xl font-semibold">Sign in to CharityFund</h1>
        <p className="mb-2">
          Don't have an account?{" "}
          <a href="/signup" className="underline">
            Sign up
          </a>
        </p>
        <form onSubmit={handleSubmit} className="md:w-96 ">
          <div className="mb-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email Address
            </label>
            <br />
            <div className="relative w-full">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute pt-3 pl-2"
              />
              <input
                type="text"
                id="email"
                placeholder="Type your email"
                className="w-full p-2 px-4 pl-8 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {errors.email && (
              <div className="text-sm text-red-600">
                <FontAwesomeIcon icon={faTriangleExclamation} /> {errors.email}
              </div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <br />
            <div className="relative w-full">
              <FontAwesomeIcon icon={faLock} className="absolute pt-3 pl-2" />
              <input
                type="password"
                id="password"
                placeholder="Type your password"
                className="w-full p-2 px-4 pl-8 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <div className="text-sm text-red-600">
                  <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                  {errors.password}
                </div>
              )}
            </div>
          </div>
          <div>
            <a href="#" className="text-sm underline">
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full p-2 mt-2 text-center text-white rounded-lg cursor-pointer bg-cyan hover:bg-cyan-dark"
          >
            <p>
              Sign in <FontAwesomeIcon icon={faRightToBracket} />
            </p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
