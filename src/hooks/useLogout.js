import api from "../api/axios.js";

export const useLogout = () => {
  return async () => {
    await api.post("/auth/logout");
    window.location.href = "/login";
  };
};
