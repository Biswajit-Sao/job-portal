import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./Companies.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GrCompliance } from "react-icons/gr";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.jobs);

  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="companies-table">
      <h3 className="table-title">A list of Posted Jobs</h3>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Role</th>
            <th>Date</th>
            <th>Action</th>
            <th>Applicants</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs.length <= 0 ? (
            <tr>
              <td colSpan="4">No Companies</td>
            </tr>
          ) : (
            filterJobs.map((job) => (
              <tr key={job?._id}>
                <td>{job?.company?.name}</td>
                <td>{job?.title}</td>
                <td>{job?.company?.createdAt.split("T")[0]}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/companies/${job._id}`)}
                  >
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                  >
                    <GrCompliance />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobsTable;
