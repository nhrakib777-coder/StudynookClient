import axios from "axios";

const api = axios.create({
  // AUTOMATIC USES LOCAL OR VERCEL URL
  baseURL: import.meta.env.VITE_API_URL 
    || "https://studynookclient.vercel.app/api",

  // Required for login/auth to work on Vercel
  withCredentials: true,
});

export default api;