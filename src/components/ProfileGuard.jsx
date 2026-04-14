import { Navigate, useLocation } from "react-router-dom";

const ProfileGuard = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");

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
    return <Navigate to="/admin/profile" state={{ from: location }} replace />;
  }

  // Block access if profile incomplete
  if (user && user.role === "agent" && !user.isProfileComplete) {
    return (
      <Navigate
        to="/admin/profile"
        state={{
          from: location,
          message: "Complete the profile section first before using admin features.",
        }}
        replace
      />
    );
  }

  return children;
};

export default ProfileGuard;