import {
  faTriangleExclamation,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { validateOrganizationForm } from "../utils/validateForm";
import { useNavigate } from "react-router-dom";

function CreateNgo() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [filename, setFilename] = useState("");
  const [formData, setFormData] = useState({
    organizationName: "",
    missionStatement: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const image = new FormData();
    image.append("image", file);
    setImage(image);
    setFilename(file.name);
  };

  const createNgo = async () => {
    console.log(image);
    try {
      const response = await axiosInstance.post(`api/v1/organization/create`, {
        userId: user._id,
        ...formData,
      });
      await axiosInstance.post(
        `api/v1/organization/logo/${response.data._id}`,
        image,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Success");
      navigate("/createcampaign");
    } catch (error) {
      console.error(error);
      alert("failed");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateOrganizationForm(formData);
    if (Object.keys(errors).length === 0) {
      createNgo();
      console.log("success");
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="flex justify-center my-9 dark:text-white">
      <div className="form">
        <h1 className="mb-2 text-2xl font-semibold">Create NGO</h1>
        <form className="w-72 sm:w-full dark:bg-dark-cyan-dark">
          <div>
            <label className="text-sm font-semibold">NGO Name</label>
            <br />
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:bg-dark-cyan-dark"
            />
            {errors.organizationName && (
              <div className="text-sm text-red-600 ">
                <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                {errors.organizationName}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Mission Statement</label>
            <br />
            <input
              type="text"
              name="missionStatement"
              value={formData.missionStatement}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:bg-dark-cyan-dark"
            />
            {errors.missionStatement && (
              <div className="text-sm text-red-600 ">
                <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                {errors.missionStatement}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="file"
              className="block w-full p-2 text-center text-white rounded-lg cursor-pointer bg-cyan hover:bg-cyan-dark"
            >
              <FontAwesomeIcon icon={faUpload} /> Upload Logo
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

          <div className="mt-4">
            <label
              htmlFor="file"
              className="block w-full p-2 text-center text-white rounded-lg cursor-pointer bg-cyan hover:bg-cyan-dark"
            >
              <FontAwesomeIcon icon={faUpload} /> Upload CAC pdf
            </label>
            <input
              id="file"
              type="file"
              name="image"
              onChange={handleImage}
              className="hidden w-full mt-1 dark:bg-dark-cyan-dark"
              accept="application/pdf"
            />
            <div className="">{filename}</div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-2 mt-4 text-center text-white rounded-lg cursor-pointer bg-cyan hover:bg-cyan-dark"
          >
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNgo;
