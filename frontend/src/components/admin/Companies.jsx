import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import CompaniesTable from "./CompaniesTable";
import "./Companies.css"; // Import CSS file
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
  useGetAllCompanies()
  
  const [input,setInput]=useState("")
    const navigate=useNavigate()

    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(setSearchCompanyByText(input))
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
          <button className="new-company-btn" onClick={()=>navigate("/admin/companies/create")}>New Company</button>
        </div>
        <CompaniesTable />
      </div>
    </>
  );
};

export default Companies;
