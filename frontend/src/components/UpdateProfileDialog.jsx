import React, { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import "./UpdateProfileDialog.css";
import axios from "axios";
import { USER_API_END_POINT } from "../utile/constant";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  // Handle input changes
  const changeEventHandler = (e) => {
    const { name, value, type, files } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file); // Correct field name
  
    try {
      const res = await axios.post(  
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
  
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  
    setLoading(false);
  };
  

  return (
    <div className={`dialog-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="dialog-title">Update Profile</h1>
        <form className="dialog-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} className="form-input" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={input.email} onChange={changeEventHandler} className="form-input" required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="form-input" required />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <input type="text" name="bio" value={input.bio} onChange={changeEventHandler} className="form-input" />
          </div>
          <div className="form-group">
            <label>Skills</label>
            <input type="text" name="skills" value={input.skills} onChange={changeEventHandler} className="form-input" placeholder="Comma-separated (e.g. React,Node.js)" />
          </div>
          <div className="form-group">
            <label>Resume</label>
            <input type="file" name="file"  onChange={changeEventHandler} className="form-input" />
          </div>
          <div className="button-group">
            {loading ? (
              <button className="loading-button" disabled>
                <BiLoaderCircle className="spinner" /> Please wait...
              </button>
            ) : (
              <button type="submit" className="submit-button">Update</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
