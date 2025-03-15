import React, { useState } from "react";
import "./Signup.css"; // Import the CSS file
import Navbar from "../shared/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "../../utile/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { BiLoaderCircle } from "react-icons/bi";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    userType: "student", // Default to student
    profilePhoto: null,
  });
  const { loading } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.userType);
    if (formData.profilePhoto) {
      formDataToSend.append("profilePhoto", formData.profilePhoto);
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Ensure this is enabled
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
    }finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <>
      <Navbar />

      <div className="signup-container">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>User Type</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={formData.userType === "student"}
                    onChange={handleChange}
                  />
                  Student
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="recruiter"
                    checked={formData.userType === "recruiter"}
                    onChange={handleChange}
                  />
                  Recruiter
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="profilePhoto">Profile Photo</label>
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
            {loading ? (
              <button className="login-button">
                <BiLoaderCircle /> Please wait
              </button>
            ) : (
              <button type="submit" className="signup-button">
                Sign Up
              </button>
            )}
          </form>
          <p className="login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
