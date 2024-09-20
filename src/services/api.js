import axios from "axios"

export const api = axios.create({
  baseURL: "easynotesapi-production-b120.up.railway.app",
});