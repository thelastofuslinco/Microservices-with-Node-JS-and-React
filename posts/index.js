const express = require("express");
const crypto = require("crypto");
const axios = require("axios");

const port = 3000;
const event_bus_url = "http://event-bus-clusterip-svc:3003/api/events";

const app = express();
app.use(express.json());

const makeCors = require("./lib/cors");
app.use(makeCors());

const posts = {};

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

app.post("/api/posts/create", (req, res) => {
  const id = crypto.randomBytes(4).toString("hex");
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send({ error: "Title and content are required." });
  }

  const newPost = { id, title, content };
  posts[id] = newPost;

  axios
    .post(event_bus_url, {
      type: "PostCreated",
      data: newPost,
    })
    .catch((err) => {
      console.log("Error sending event to event bus:", err.message);
    });

  res.status(201).send(newPost);
});

app.post("/api/events", (req, res) => {
  console.log("Received Event:", req.body.type);

  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log("Version 0.0.3");
  console.log(`Posts service is running on port ${port}`);
});
