import axios from "axios";

export const isTokenValid = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;

  try {
    await axios.get("http://127.0.0.1:8000/api/auth/user", {
      headers: { Authorization: `Bearer ${token}` }
    });

    return true;
  } catch (err) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_roles");
    localStorage.removeItem("user_permissions");

    return false;
  }
};
