import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { validateCampaignForm } from "../utils/validateForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

function CreateCampaign() {
  const [tags, setTags] = useState([]);

  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    goalAmount: "",
    description: "",
    endDate: "",
    tags: "",
  });

  const tagsSuggestion = [
    "Charity",
    "Donate",
    "NonProfit",
    "Fundraising",
    "GiveBack",
    "HelpOthers",
    "Philanthropy",
    "Support",
    "GoodCause",
    "CharityWork",
    "Volunteer",
    "CommunitySupport",
    "DonateNow",
    "MakeADifference",
    "CharityEvent",
    "Crowdfunding",
    "HumanitarianAid",
    "CharitableGiving",
    "SocialGood",
    "ActOfKindness",
  ];

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
    console.log(event.target.files[0]);
    const image = new FormData();
    image.append("image", event.target.files[0]);
    setImage(image);
  };

  return (
    <div className="flex justify-center mt-24">
      <div className="form">
        <h1 className="mb-2 text-2xl font-semibold">Create Campaign</h1>
        <form className="w-72 sm:w-full">
          <div>
            <label className="text-sm font-semibold">Title</label>
            <br />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100"
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
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100"
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
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100"
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
              className="w-full p-2 px-4 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100"
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
              <div className="flex flex-wrap items-center justify-start gap-1 w-72">
                {tags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className="flex gap-1 px-2 py-1 my-2 mr-2 bg-gray-200 rounded-xl"
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
                className="tags"
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

            <div>
              <input
                type="file"
                name="image"
                onChange={handleImage}
                className="w-full mt-2"
              />
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
