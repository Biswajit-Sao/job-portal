import React from 'react';
import LatestJobCard from './LatestJobCard';
import './LatestJobs.css';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  // Ensure store.jobs exists before destructuring
  const jobsState = useSelector(store => store.jobs) || {}; 
  const { allJobs = [] } = jobsState; // Default to an empty array to prevent errors

  return (
    <div className="latest-jobs-container">
      <h2 className="latest-jobs-title">Latest Jobs</h2>
      <div className="latest-jobs-grid">
        {
          allJobs.length <= 0 ? <span>No job Available</span> :
          allJobs.slice(0,6).map((job) => (
            <LatestJobCard key={job._id} job={job}/>
          ))
        }
      </div>
    </div>
  );
};

export default LatestJobs;
