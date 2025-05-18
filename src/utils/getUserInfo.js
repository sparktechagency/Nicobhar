
import jwtDecode from "jwt-decode";

export const getUserInfo = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // get email, id, role 
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
