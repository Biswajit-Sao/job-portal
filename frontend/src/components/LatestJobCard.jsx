import React from "react";

import "./LatestJobCard.css"; 
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({ job }) => {

  const navigate=useNavigate()

  return (
    <div className="latest-job-card">
      <div className="job-card-content">
        <h3 className="job-title">{job?.company?.name}</h3>
        <div className="company-details">
          <img
            src={job?.company?.logo}
            alt="Company Logo"
            className="company-logo"
          />
          <div>
            <p className="company-name">{job?.title}</p>
            <p className="job-location">{job?.location}</p>
          </div>
        </div>
        <div className="job-positions">
          <p>
            {job?.position}  position
             
          </p>
        </div>
        <div className="job-meta">
          <p className="job-type"> {job?.jobType} </p>
          <p className="job-salary">Salary: {job?.salary} LPA</p>
        </div>
        <p className="job-description">
        {job?.descripation}
        </p>
      </div>
      <button className="apply-button" onClick={() => navigate(`/description/${job?._id}`)}>Apply Now</button>
    </div>
  );
};

export default LatestJobCard;
