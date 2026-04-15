import { Navigate, useLocation } from "react-router-dom";

const ProfileGuard = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");
  const isProfileComplete = localStorage.getItem("isProfileComplete");


  let user = null;

  try {
    const userString = localStorage.getItem("user");

    //  handle "undefined", null, empty
    if (userString && userString !== "undefined") {
      user = JSON.parse(userString);
    }
  } catch (err) {
    console.error("User parse error:", err);
    user = null;
  }

  //  Not logged in
  if (!token) {
    return <Navigate to="/b2blogin" state={{ from: location }} replace />;
  }

  // Block access if profile incomplete
   if (isProfileComplete !== "true") {
    return (
      <Navigate
        to="/admin/profile"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default ProfileGuard;