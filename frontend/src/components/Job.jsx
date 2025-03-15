import React from "react";
import { MdBookmarkBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Job.css"; // Ensure this file contains the updated CSS styles

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Function to calculate the number of days ago the job was posted
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="job-card-unicorn">
      <div className="job-header-unicorn">
        <p>
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <button>
          <MdBookmarkBorder />
        </button>
      </div>
      <div className="job-company-unicorn">
        <img src={job?.company?.logo} alt="Company Logo" />
        <div>
          <h1>{job?.company?.name}</h1>
          <p>{job?.location}</p>
        </div>
      </div>
      <div className="job-title-unicorn">
        <h1>{job?.title}</h1>
        <p>{job?.description}</p>
      </div>
      <div className="job-details-unicorn">
        <p>{job?.position} Position</p>
        <p>{job?.jobType}</p>
        <p>{job?.salary} LPA</p>
      </div>
      <div className="job-actions-unicorn">
        <button onClick={() => navigate(`/description/${job?._id}`)}>
          Details
        </button>
        <button>Save for Later</button>
      </div>
    </div>
  );
};

export default Job;