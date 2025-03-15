import React, { useEffect, useState } from "react";
import "./JobDescription.css";
import Navbar from "./components/shared/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "./redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "./utile/constant";
import { toast } from "react-toastify";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Failed to load job details.");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Application error:", error);
      toast.error(error.response?.data?.message || "Application failed.");
    }
  };

  

  return (
    <>
      <Navbar />
      <div className="jd-container">
        <div className="jd-header">
          <h1>{singleJob?.title || "Job Title"}</h1>
        </div>
        <div className="jd-details">
          <table>
            <tr>
              <td>{singleJob?.position || 0} positions</td>
              <td>{singleJob?.jobType || "N/A"}</td>
              <td>
                {singleJob?.salary
                  ? `${singleJob.salary} LPA`
                  : "Salary Not Disclosed"}
              </td>
            </tr>
          </table>
        </div>

        <button
          onClick={isApplied ? null : applyJobHandler}
          className="jd-apply-button"
          disabled={isApplied}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>

        <div className="jd-content">
          <table>
            <tr>
              <th>Job Description</th>
            </tr>
            <tr>
              <td>{singleJob?.descripation || "N/A"}</td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Role</th>
              <th>Location</th>
              <th>Position</th>
            </tr>
            <tr>
              <td>{singleJob?.title || "N/A"}</td>
              <td>{singleJob?.location || "N/A"}</td>
              <td>{singleJob?.position || "N/A"}</td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Requirements</th>
            </tr>
            <tr>
              <td>{singleJob?.requirements || "N/A"}</td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Experience</th>
              <th>Salary</th>
              <th>Total Applicants</th>
              <th>Posted Date</th>
            </tr>
            <tr>
              <td>{singleJob?.experienceLevel || "0"} year</td>
              <td>
                {singleJob?.salary ? `${singleJob.salary} LPA` : "N/A"}
              </td>
              <td>{singleJob?.applications?.length || 0}</td>
              <td>
                {singleJob?.createdAt
                  ? singleJob.createdAt.split("T")[0]
                  : "N/A"}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default JobDescription;