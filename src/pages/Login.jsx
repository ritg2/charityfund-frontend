import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateLoginForm = (formData) => {
    let errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const login = async (formdata) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/user/login",
        formdata
      );
      const { data: userData } = await axios.get(
        "http://localhost:5001/api/user/current",
        {
          headers: { Authorization: `Bearer ${data.accessToken}` },
        }
      );
      setUser(userData);
      localStorage.setItem("auth", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

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
      login(formData);
    } else {
      setErrors(errors);
    }
  };
  return (
    <div className="form-container">
      <div className="form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="text"
              id="email"
              placeholder="Type your email"
              className="email-input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            {errors.email && <span className="errors">{errors.email}</span>}
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="Type your password"
              className="password-input"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <span className="errors">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
