import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assest } from "../../assest/assest";
import { CiLogout } from "react-icons/ci";
import { MdLogin } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_API_END_POINT } from "../../utile/constant";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  // const [isLoggedIn, setIsLoggedIn] = useState(user);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="unique-navbar">
      <div className="navbar-logo">LOGO</div>
      <div className="navbar-links">
        {user && user.role === "recruiter" ? (
          <>
            <Link to="/admin/companies">Companies</Link>
            <Link to="/admin/jobs">Jobs</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/Jobs">Jobs</Link>
            <Link to="/browse">Browse</Link>
          </>
        )}

        {user ? (
          <div
            className="navbar-avatar-container"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="navbar-avatar">
              {user?.profile?.profilePhoto ? (
                <img
                  src={user?.profile?.profilePhoto}
                  alt="Avatar"
                  className="avatar-img"
                />
              ) : (
                <img
                  src={assest.avatarImg}
                  alt="Avatar"
                  className="avatar-img"
                />
              )}
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
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

                <div className="dropdown-info">
                  <h4>{user?.fullname}</h4>
                  <p>{user?.role}</p>
            {
              user && user.role ==='student'&&(
                <Link to="/profile">
                    <button className="profile-btn">
                      <RxAvatar className="icon" /> Profile
                    </button>
                  </Link>
              )
            }
                  
                  <button
                    className="logout-btn"
                    onClick={() => logoutHandler()}
                  >
                    <CiLogout className="icon" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login">
              <button className="login-btn">
                <MdLogin className="icon" /> Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="signup-btn">
                <SiGnuprivacyguard className="icon" /> Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
