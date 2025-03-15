import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import "./Companies.css"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { setSearchCompanyByText } from "../../redux/companySlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input,setInput]=useState("")
    const navigate=useNavigate()

    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(setSearchJobByText(input))
    },[input,dispatch])
  return (
    <>
      <Navbar />
      <div className="companies-container">
        <div className="companies-header">
          <input
            type="text"
            placeholder="Filter by name"
            className="filter-input"
            onChange={(e)=>setInput(e.target.value)}
          />
          <button className="new-company-btn" onClick={()=>navigate("/admin/jobs/create")}>Post New Jobs</button>
        </div>
        <AdminJobsTable/>
      </div>
    </>
  );
};

export default AdminJobs;
