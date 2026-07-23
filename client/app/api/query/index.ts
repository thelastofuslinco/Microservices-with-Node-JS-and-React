import axios from "axios";

const query = axios.create({
  baseURL: "http://localhost:3002",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default query;
