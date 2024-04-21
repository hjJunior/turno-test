import { useStorage } from "@vueuse/core";

const STORAGE_TOKEN_KEY = "auth_token";

const useAuthToken = () => useStorage(STORAGE_TOKEN_KEY, "");

export default useAuthToken;
