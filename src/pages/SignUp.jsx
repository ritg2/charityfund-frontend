import { useState } from "react";
import { validateSignupForm } from "../utils/validateForm";
import axiosInstance from "../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faTriangleExclamation,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "",
  });
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [filename, setFilename] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signUp = async (formdata) => {
    const { username, email, password, phone, fullname, role } = formdata;
    try {
      const response = await axiosInstance.post("/api/v1/user/register", {
        username,
        email,
        password,
        phone,
        fullname,
        role,
      });
      await axiosInstance.post(
        `/api/v1/user/profile-picture/${response.data._id}`,
        image,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "",
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
  const handleImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const image = new FormData();
    image.append("image", file);
    setImage(image);
    setFilename(file.name);
  };

  return (
    <div className="flex justify-center my-9 dark:text-white">
      <div className="form">
        <p className="mb-4 ">Welcome to CharityFund</p>
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
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
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
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
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
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
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
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
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
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
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
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
            />
            {errors.phone && (
              <div className="text-sm text-red-600 ">
                {" "}
                <FontAwesomeIcon icon={faTriangleExclamation} /> {errors.phone}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">role</label>
            <br />
            <select
              type="option"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
            >
              <option value="donor">Donor</option>
              <option value="ngo">NGO</option>
            </select>
            {errors.role && (
              <div className="text-sm text-red-600 ">
                {" "}
                <FontAwesomeIcon icon={faTriangleExclamation} /> {errors.role}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="file"
              className="block w-full p-2 text-center text-white rounded-lg cursor-pointer bg-cyan hover:bg-cyan-dark"
            >
              <FontAwesomeIcon icon={faUpload} /> upload profile picture
            </label>
            <input
              id="file"
              type="file"
              name="image"
              onChange={handleImage}
              className="hidden w-full mt-1 dark:bg-dark-cyan-dark"
              accept="image/*"
            />
            <div className="">{filename}</div>
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
