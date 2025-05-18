// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ isAuthorized }) => {
//   return ( isAuthorized) ? <Outlet /> : <Navigate to='/login' />
// }

// export default ProtectedRoute;


// ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;
