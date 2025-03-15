import React from "react";
import "./AppliedJobTable.css"; // Import the CSS file
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.jobs);
 
  return (
    <div className="applied-job-table-container">
      <table className="applied-job-table">
        <thead>
          <tr className="applied-job-table-header">
            <th>Date</th>
            <th>Job Role</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allAppliedJobs.length <= 0 ? (
            <tr className="applied-job-table-empty-row">
              <td colSpan="4">No Jobs Applied Yet</td>
            </tr>
          ) : (
            allAppliedJobs.map((item, index) => (
              <tr key={index} className="applied-job-table-row">
                <td>{item.createdAt.split("T")[0]}</td>
                <td>{item?.job?.title}</td>
                <td>{item?.job?.company?.name}</td>
                <td>
                  <span className={`status-badge status-${item.status}`}>
                    {item.status}
                  
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobTable;