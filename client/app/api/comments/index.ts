import axios from "axios";

const comments = axios.create({
  baseURL: "http://posts.com/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default comments;
