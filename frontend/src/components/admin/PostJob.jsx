import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import "./PostJob.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utile/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    descripation: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error("Failed to post job.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="post-job-container">
        <h2>Post a Job</h2>
        <form onSubmit={handleSubmit} className="post-job-form">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={input.title}
            onChange={handleChange}
            required
            className="post-job-input"
          />
          <textarea
            name="descripation"
            placeholder="Job Description"
            value={input.descripation}
            onChange={handleChange}
            required
            className="post-job-textarea"
          />
          <input
            type="text"
            name="requirements"
            placeholder="Requirements"
            value={input.requirements}
            onChange={handleChange}
            required
            className="post-job-input"
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={input.salary}
            onChange={handleChange}
            required
            className="post-job-input"
          />
          <input
            type="text"
            name="jobType"
            placeholder="Job Type (e.g., Full-time, Part-time)"
            value={input.jobType}
            onChange={handleChange}
            required
            className="post-job-input"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={input.location}
            onChange={handleChange}
            required
            className="post-job-input"
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience Required"
            value={input.experience}
            onChange={handleChange}
            required
            className="post-job-input"
          />
          <input
            type="number"
            name="position"
            placeholder="Number of Positions"
            value={input.position}
            onChange={handleChange}
            required
            className="post-job-input"
          />

          {companies.length > 0 ? (
            <select
              name="companyId"
              value={input.companyId}
              onChange={handleChange}
              required
              className="post-job-select"
            >
              <option value="">Select a Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          ) : (
            <p className="post-job-err">* Please register a company first</p>
          )}

          <button type="submit" className="post-job-button" disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </>
  );
};

export default PostJob;