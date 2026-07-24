const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const posts_url = process.env.POSTS_URL || "http://localhost:3000";
const comments_url = process.env.COMMENTS_URL || "http://localhost:3001";
const query_url = process.env.QUERY_URL || "http://localhost:3002";
const moderation_url = process.env.MODERATION_URL || "http://localhost:3004";

const events = [];

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);
  events.push(req.body);

  // Send event to posts service
  axios.post(posts_url + "/events", req.body).catch((err) => {
    console.log("Error sending event to posts service:", err.message);
  });

  // Send event to comments service
  axios.post(comments_url + "/events", req.body).catch((err) => {
    console.log("Error sending event to comments service:", err.message);
  });

  // Send event to query service
  axios.post(query_url + "/events", req.body).catch((err) => {
    console.log("Error sending event to query service:", err.message);
  });

  // Send event to moderation service
  axios.post(moderation_url + "/events", req.body).catch((err) => {
    console.log("Error sending event to moderation service:", err.message);
  });

  res.send({ status: "OK" });
});

app.listen(3003, () => {
  console.log("Listening on 3003");
});
