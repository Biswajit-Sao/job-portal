import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utile/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";
import "./Applicants.css"; 

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {}
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <>
      <Navbar />
      <div className="applicants-container">
        <h1 className="applicants-heading">
          Applicants: {applicants?.applications?.length || 0}
        </h1>
        <ApplicantsTable />
      </div>
    </>
  );
};

export default Applicants;
