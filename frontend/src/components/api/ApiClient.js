import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

// Add a request interceptor
apiClient.interceptors.request.use(
  function (config) {
    // Do something before sending the request
    const token = getCookie("_auth");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}
