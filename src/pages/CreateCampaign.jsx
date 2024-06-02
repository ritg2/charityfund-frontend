import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateCampaign() {
  const { user } = useContext(AuthContext);

  return (
    <div className="form-container">
      <div className="form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <span className="errors">{errors.username}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCampaign;
