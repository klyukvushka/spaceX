import axios from "axios";

export const request = axios.create({
  baseURL: "https://api.spacexdata.com/v3"
});
