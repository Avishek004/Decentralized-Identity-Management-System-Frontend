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
