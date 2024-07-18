import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    let errors = {};

    if (!formData.fullname.trim()) {
      errors.fullname = "Fullname name is required";
    }
    if (!formData.username.trim()) {
      errors.username = "username is required";
    }
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
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.length < 11) {
      errors.phone = "Phone must be 11 characters long";
    }
    return errors;
  };

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
      const { data } = await axios.post(
        "http://localhost:5001/api/v1/user/register",
        { username, email, password, phone, fullname }
      );
      
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      signUp(formData);
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Fullname</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
            />
            {errors.fullname && (
              <span className="errors">{errors.fullname}</span>
            )}
          </div>

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

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="errors">{errors.email}</span>}
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <span className="errors">{errors.password}</span>
            )}
          </div>

          <div>
            <label>Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <span className="errors">{errors.confirmPassword}</span>
            )}
          </div>

          <div>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <span className="errors">{errors.phone}</span>}
          </div>

          <button type="submit" className="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
