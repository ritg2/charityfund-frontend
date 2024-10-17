import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { validateCampaignForm } from "../utils/validateForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCircleXmark,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { tagsSuggestion } from "../utils/tags";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function CreateCampaign() {
  const { user } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [filename, setFilename] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    goalAmount: "",
    description: "",
    endDate: "",
    tags: "",
  });

  useEffect(() => {
    axiosInstance
      .get(`/api/v1/organization/${user._id}`)
      .then((response) => {
        if (!response) {
          navigate("/createngo");
        }
      })
      .catch((error) => {
        console.error(error);
        navigate(-1);
      });
  }, []);

  const createCampaign = async (formData, image) => {
    const collectedData = { ...formData, tags: tags };
    try {
      const { data } = await axiosInstance.post(
        `/api/v1/campaign`,
        collectedData
      );
      await axiosInstance.post(`/api/v1/campaign/${data._id}/image`, image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage("");
      console.log("successfully uploaded image");
      setFormData({
        title: "",
        goalAmount: "",
        description: "",
        endDate: "",
        tags: "",
      });
      setTags([]);
      alert("Campaign has been succesfully created!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addTag = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const value = formData.tags.trim();
      if (!value || value.length < 3) {
        setErrors({ tags: "tags must be 3 or more letters" });
        return;
      }
      if (tags.includes(value)) {
        setErrors({ tags: "tag already exists" });
        return;
      }
      setErrors({});
      setTags((prevTags) => [...prevTags, value]);
      setFormData({ ...formData, tags: "" });
    }
  };

  const removeTag = () => {
    const newTags = tags.slice(0, -1);
    setTags(newTags);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateCampaignForm(formData);
    if (Object.keys(errors).length === 0) {
      createCampaign(formData, image);
      console.log("success");
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
        <h1 className="mb-2 text-2xl font-semibold">Create Campaign</h1>
        <form className="w-72 sm:w-full dark:bg-dark-cyan-dark">
          <div>
            <label className="text-sm font-semibold">Title</label>
            <br />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:bg-dark-cyan-dark"
            />
            {errors.title && (
              <div className="text-sm text-red-600 ">
                <FontAwesomeIcon icon={faTriangleExclamation} /> {errors.title}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Goal Amount</label>
            <br />
            <input
              type="number"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:bg-dark-cyan-dark"
            />
            {errors.goalAmount && (
              <div className="text-sm text-red-600 ">
                <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                {errors.goalAmount}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Description</label>
            <br />
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:bg-dark-cyan-dark"
            ></textarea>
            {errors.description && (
              <div className="text-sm text-red-600 ">
                <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                {errors.description}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">End Date</label>
            <br />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:bg-dark-cyan-dark"
            />
            {errors.endDate && (
              <div className="text-sm text-red-600 ">
                <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                {errors.endDate}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="" className="text-sm font-semibold">
              Tags
            </label>
            <br />
            <div>
              <div className="flex flex-wrap items-center justify-start gap-1 w-72 ">
                {tags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className="flex gap-1 px-2 py-1 my-2 mr-2 bg-gray-200 rounded-xl dark:bg-dark-black"
                    >
                      {tag}
                      <div onClick={removeTag}>
                        {" "}
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="hover:cursor-pointer hover:text-white"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <input
                className="px-2 py-1 border border-solid rounded-lg dark:bg-dark-cyan-dark focus:outline-none border-cyan-dark hover:bg-gray-100"
                type="text"
                name="tags"
                list="tags"
                onChange={handleInputChange}
                value={formData.tags}
                onKeyDown={addTag}
                placeholder="please add a tag"
              />
              {errors.tags && (
                <div className="text-sm text-red-600 ">
                  <FontAwesomeIcon icon={faTriangleExclamation} /> {errors.tags}
                </div>
              )}
              <datalist id="tags">
                {tagsSuggestion.map((tag, index) => {
                  return <option key={index} value={tag} />;
                })}
              </datalist>
            </div>

            <div className="mt-4">
              <label
                htmlFor="file"
                className="block w-full p-2 text-center text-white rounded-lg cursor-pointer bg-cyan hover:bg-cyan-dark"
              >
                <FontAwesomeIcon icon={faUpload} /> upload cover picture
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

export default CreateCampaign;

export const createCampaignLoader = async () => {
  const navigate = useNavigate();
  try {
    const response = axiosInstance.get("api/v1/user/current");
    if (response.user.role !== "ngo") {
      navigate(-1);
      return;
    }
    return;
  } catch (error) {
    console.error(error?.message);
  }
};
