import axios from "axios";
const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`,
  },
});

export default apiService;
