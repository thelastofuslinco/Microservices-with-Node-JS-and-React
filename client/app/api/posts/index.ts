import axios from "axios";

const posts = axios.create({
  baseURL: "http://posts.com/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default posts;
