import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateCampaign() {
  const [tags, setTags] = useState([]);

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

  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    let errors = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.goalAmount.trim()) {
      errors.goalAmount = "Goal Amount is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is is required";
    }
    if (!formData.endDate.trim()) {
      errors.endDate = "endDate is is required";
    }

    return errors;
  };

  const createCampaign = async (formData) => {
    const collectedData = { ...formData, tags: tags };
    const { accessToken } = JSON.parse(localStorage.getItem("auth"));
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/v1/campaign",
        collectedData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      alert("success");
      setFormData({
        title: "",
        goalAmount: "",
        description: "",
        endDate: "",
        tags: "",
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      createCampaign(formData);
      console.log("success");
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <h1>Create Campaign</h1>
        <form>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            {errors.title && <span className="errors">{errors.title}</span>}
          </div>

          <div>
            <label>Goal Amount</label>
            <input
              type="number"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleInputChange}
            />
            {errors.goalAmount && (
              <span className="errors">{errors.goalAmount}</span>
            )}
          </div>

          <div>
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
            {errors.description && (
              <span className="errors">{errors.description}</span>
            )}
          </div>

          <div>
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
            {errors.endDate && <span className="errors">{errors.endDate}</span>}
          </div>

          <div>
            <label htmlFor="">Tags</label>
            <div className="tags-container">
              {tags.map((tag, index) => {
                return (
                  <div key={index}>
                    {tag}
                    <span onClick={removeTag}>x</span>
                  </div>
                );
              })}
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
              {errors.tags && <span className="errors">{errors.tags}</span>}
              <datalist id="tags">
                {tagsSuggestion.map((tag, index) => {
                  return <option key={index} value={tag} />;
                })}
              </datalist>
            </div>
          </div>

          <button type="button" className="submit" onClick={handleSubmit}>
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCampaign;
