import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import "./CompanySetup.css";
import { COMPANY_API_END_POINT } from "../../utile/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BiLoaderCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {

  const params = useParams();

  useGetCompanyById(params.id)
  

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const {singleCompany}=useSelector(store=>store.company)

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("website", formData.website);
    data.append("location", formData.location);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  if (singleCompany) { // Ensure singleCompany is not null or undefined
    setFormData({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }
}, [singleCompany]);

  return (
    <>
      <Navbar />
      <div className="company-setup-container">
        <form className="company-setup-form" onSubmit={handleSubmit}>
          <div className="company-setup-form-header">
            <button type="button" className="company-setup-back-button" onClick={() => navigate("/admin/companies")}>
              <IoMdArrowRoundBack className="company-setup-back-icon" />
              <span>Back</span>
            </button>
            <h1>Company Setup</h1>
          </div>

          <label>Company Name</label>
          <input
            type="text"
            name="name"
            className="company-setup-input"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <input
            type="text"
            name="description"
            className="company-setup-input"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Website</label>
          <input
            type="text"
            name="website"
            className="company-setup-input"
            value={formData.website}
            onChange={handleChange}
            required
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            className="company-setup-input"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label>Logo</label>
          <input
            type="file"
            accept="image/*"
            className="company-setup-file-input"
            onChange={handleFileChange}
          />

          <button type="submit" className="company-setup-update-button" disabled={loading}>
            {loading ? <><BiLoaderCircle className="company-setup-loading-icon" /> Please wait</> : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CompanySetup;
