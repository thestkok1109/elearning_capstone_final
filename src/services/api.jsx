import axios from "axios";
import { store } from "..";
import { setIsLoadingOff, setIsLoadingOn } from "../redux/spinnerSlice/spinnerSlice";
import { TOKEN_CYBERSOFT } from "./constant";


export const https = axios.create({
  baseURL: 'https://elearningnew.cybersoft.edu.vn',
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    // Authorization:"Bearer " + JSON.parse(localStorage.getItem("TOKEN"))
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("USER_LOGIN"))?.accessToken
  }
});

// Add a request interceptor
https.interceptors.request.use(function (config) {
  // Do something before request is sent
  store.dispatch(setIsLoadingOn());
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
https.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  store.dispatch(setIsLoadingOff());
  return response;
}, function (error) {
  store.dispatch(setIsLoadingOff());
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});