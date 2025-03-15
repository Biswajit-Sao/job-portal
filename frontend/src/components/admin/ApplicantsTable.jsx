import axios from "axios";
import React from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { GrCheckmark, GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../utile/constant";
import { toast } from "react-toastify";
import "./Applicants.css"; // Import CSS

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Optionally, you can refresh the data or update the state here
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2 className="applicants-heading">List of Applicants</h2>
      <table className="applicants-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Resume</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants?.applications?.map((item, key) => (
            <tr key={key}>
              <td>{item.applicant.fullname}</td>
              <td>{item.applicant.email}</td>
              <td>{item.applicant.phoneNumber}</td>
              <td>
                <a href={item?.applicant?.profile?.resume} className="resume-icon">
                  <FaRegAddressCard />
                </a>
              </td>
              <td>{item.applicant.createdAt.split("T")[0]}</td>
              <td className="applicants-action-btns">
                {item.status==="pending" ? (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => statusHandler("approved", item._id)}
                    >
                      <GrCheckmark />
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => statusHandler("rejected", item._id)}
                    >
                      <GrClose />
                    </button>
                  </>
                ) : ( // If status exists, show the status text
                  <span className={`status-text ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;