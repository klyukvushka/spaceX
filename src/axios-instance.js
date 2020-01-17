import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.spacexdata.com/v3"
});
