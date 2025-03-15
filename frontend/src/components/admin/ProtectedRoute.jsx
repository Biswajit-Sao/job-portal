import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {  // ✅ Corrected component name
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== 'recruiter') {
      navigate("/");
    }
  }, [user, navigate]); // ✅ Added 'navigate' to dependencies to prevent warnings

  return <>{children}</>;
}

export default ProtectedRoute;
