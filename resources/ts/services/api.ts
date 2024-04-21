import axios from "axios";
import useAuthToken from "../modules/auth/hooks/useAuthToken";

const api = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthToken().value;
  if (!token) return config;

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use((response) => {
  const token = useAuthToken();
  const freshToken = response.headers["authorization"]?.split(" ")[1];

  if (freshToken) {
    token.value = freshToken;
  }

  return response;
});

export const getResponseError = (error: any): string => {
  if ("name" in error && error.name != "AxiosError") {
    throw error;
  }

  const response = error.response.data;
  return response.message ?? response.error;
};

export default api;
