import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { assest } from "../assest/assest";
import { FaPenAlt, FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { CiMemoPad } from "react-icons/ci";
import AppliedJobTable from "./AppliedJobTable";
import "./Profile.css";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAllAppliedJob from "../hooks/useGetAllAppliedJob";


const isResume = true;

const Profile = () => {
  useGetAllAppliedJob()
  const[open,setOpen]=useState(false)
  const {user}=useSelector(store=>store.auth)
  return (
    <>
      <Navbar />
    <div className="container-profile">
      <div className="profile-header">
        {user?.profile?.profilePhoto ? (
                          <img
                            src={user?.profile?.profilePhoto}
                            alt="Avatar"
                            className="dropdown-avatar"
                          />
                        ) : (
                          <img
                            src={assest.avatarImg}
                            alt="Avatar"
                            className="dropdown-avatar"
                          />
                        )}
        <div>
          <h1>{user?.fullname}</h1>
          <p>
          {user?.profile?.bio}
          </p>
        </div>
        <button onClick={()=>setOpen(true)} className="edit-btn">
          <FaPenAlt />
        </button>
      </div>
      <div className="contact-info">
        <div>
          <IoIosMail /> {user?.email}
        </div>
        <div>
          <FaPhone /> {user?.phoneNumber}
        </div>
      </div>
      <div className="skills-section">
        <h1>Skills</h1>
        <div className="skills-container">
          {user?.profile?.skills.length !== 0 ? (
            user?.profile?.skills.map((item, index) => (
              <div key={index} className="badge">{item}</div>
            ))
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="resume-section">
        <h1>Resume</h1>
        <div>
          {isResume ? (
            <a target="blank" href={user?.profile?.resume}>
              <CiMemoPad />{user?.profile?.resumeOrignalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="applied-jobs-section">
        <h1>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
    </div>
    <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </>
  );
};

export default Profile;
