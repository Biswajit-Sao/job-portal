import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import "./CompanyCreate.css";
import axios from "axios";
import { toast } from "react-toastify";
import { COMPANY_API_END_POINT } from "../../utile/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty.");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to register the company. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="company-create-container-unique">
        <div className="company-header-unique">
          <h1>Your Company Name</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div className="form-group-unique">
          <label className="label-unique">Company Name</label>
          <input
            className="input-unique"
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="buttons-unique">
          <button className="cancel-btn-unique" onClick={() => navigate("/admin/companies")}>
            Cancel
          </button>
          <button className="continue-btn-unique" onClick={registerNewCompany}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanyCreate;
