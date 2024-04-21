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

export default api;
