import axios, { AxiosResponse } from "axios";
import useAuthToken from "../modules/auth/hooks/useAuthToken";
import router from "@/router";

const NOT_AUTHORIZED = 401;

const tokenUpdater = (response: AxiosResponse) => {
  const token = useAuthToken();
  const freshToken = response.headers["authorization"]?.split(" ")[1];

  if (freshToken) {
    token.value = freshToken;
  }
};

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

api.interceptors.response.use(
  (response) => {
    tokenUpdater(response);
    return response;
  },
  (error) => {
    if ("response" in error) {
      const response = error.response as AxiosResponse;
      tokenUpdater(response);

      if (response.status == NOT_AUTHORIZED) {
        useAuthToken().value = null;
        router.replace({ name: "auth.login" });
      }
    }
    throw error;
  }
);

export default api;
