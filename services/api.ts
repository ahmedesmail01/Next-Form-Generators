import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.request.use(
  async function (config) {
    // config.headers[
    //   "Authorization"
    // ] = `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Add any response interceptors here
    console.log("Response Interceptor:", response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
