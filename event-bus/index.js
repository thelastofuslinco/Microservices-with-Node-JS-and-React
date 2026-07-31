const express = require("express");
const axios = require("axios");

const port = 3003;

const posts_url = "http://posts-clusterip-svc:3000";
const comments_url = "http://comments-clusterip-svc:3001";
const query_url = "http://query-clusterip-svc:3002";
const moderation_url = "http://moderation-clusterip-svc:3004";

const app = express();
app.use(express.json());

const events = [];

app.get("/api/events", (req, res) => {
  res.send(events);
});

app.post("/api/events", (req, res) => {
  console.log("Received Event:", req.body.type);
  events.push(req.body);

  // Send event to posts service
  axios.post(posts_url + "/api/events", req.body).catch((err) => {
    console.log("Error sending event to posts service:", err.message);
  });

  // Send event to comments service
  axios.post(comments_url + "/api/events", req.body).catch((err) => {
    console.log("Error sending event to comments service:", err.message);
  });

  // Send event to query service
  axios.post(query_url + "/api/events", req.body).catch((err) => {
    console.log("Error sending event to query service:", err.message);
  });

  // Send event to moderation service
  axios.post(moderation_url + "/api/events", req.body).catch((err) => {
    console.log("Error sending event to moderation service:", err.message);
  });

  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log("Event bus is running on port", port);
});
