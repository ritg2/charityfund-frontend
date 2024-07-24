import { useState } from "react";
import { validateSignupForm } from "../utils/validateForm";
import axiosInstance from "../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signUp = async (formdata) => {
    const { username, email, password, phone, fullname } = formdata;
    try {
      await axiosInstance.post("/api/v1/user/register", {
        username,
        email,
        password,
        phone,
        fullname,
      });
      setFormData({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
      alert("SignUp successfull check email for verification");
    } catch (error) {
      console.error(error);
      alert("SignUp failed");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateSignupForm(formData);
    if (Object.keys(errors).length === 0) {
      signUp(formData);
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <div className="form">
        <p className="mb-4">Welcome to CharityFund</p>
        <h1 className="mb-2 text-2xl font-semibold">Create an account</h1>
        <p className="mb-2">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Sign in
          </a>
        </p>
        <form onSubmit={handleSubmit} className="md:w-96">
          <div>
            <label className="text-sm font-semibold">Fullname</label>
            <br />
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100"
            />
            {errors.fullname && (
              <div className="text-sm text-red-600 ">
                <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                {errors.fullname}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Username</label>
            <br />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100"
            />
            {errors.username && (
              <div className="text-sm text-red-600 ">
                <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                {errors.username}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100"
            />
            {errors.email && (
              <div className="text-sm text-red-600 ">
                <FontAwesomeIcon icon={faTriangleExclamation} /> {errors.email}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100"
            />
            {errors.password && (
              <div className="text-sm text-red-600 ">
                <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                {errors.password}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Confirm password</label>
            <br />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100"
            />
            {errors.confirmPassword && (
              <div className="text-sm text-red-600 ">
                <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Phone</label>
            <br />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100"
            />
            {errors.phone && (
              <div className="text-sm text-red-600 ">
                {" "}
                <FontAwesomeIcon icon={faTriangleExclamation} /> {errors.phone}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 mt-4 text-center text-white rounded-lg cursor-pointer bg-cyan hover:bg-cyan-dark"
          >
            <p>
              Sign up <FontAwesomeIcon icon={faRightToBracket} />
            </p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
