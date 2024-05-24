import axios from "axios";

export const signUp = async (payload) => {
  return await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/api/v1/auth/signup`, payload, {
    headers: { "Content-Type": "application/json" },
  });
};

export const login = async (payload) => {
  return await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/api/v1/auth/login`, payload, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getUserInfo = async () => {
  return await axios
    .get(`${import.meta.env.VITE_AUTH_API_URL}/api/v1/auth/get-user-info`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      "Content-Type": "application/json",
    })
    .catch((err) => localStorage.removeItem("access_token"));
};

export const updateUserInfo = async (payload) => {
  return await axios.put(`${import.meta.env.VITE_AUTH_API_URL}/api/v1/auth/update-user-info`, payload, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    "Content-Type": "application/json",
  });
};
