import axios from "axios";
import { getDataFromCookie, setDataToCookie } from "../../utils/data-service";

const request = axios.create({ baseURL: "https://app.olimjanov.uz/v1" });
async function refreshAccessToken() {
    try {
      const refresh_token = getDataFromCookie("refresh_token");
      if (!refresh_token) {
        throw new Error("Refresh token not fount");
      }
      const response = await axios.post(
        `https://app.olimjanov.uz/v1/auth/refresh-accesstoken/${refresh_token}`
      );
      const { access_token } = response.data;
      setDataToCookie("access_token", access_token);
      return access_token;
    } catch (error) {
      console.log(error);
    }
  }

request.interceptors.request.use((config) => {
  const token = getDataFromCookie("access_token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const access_token = await refreshAccessToken();
      if (access_token) {
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = access_token;
      } else {
        console.error(
          "Failed to refresh access token,Redirecting to login page... "
        );
        return Promise.reject(error);
      }
    }
  }
);

export default request;