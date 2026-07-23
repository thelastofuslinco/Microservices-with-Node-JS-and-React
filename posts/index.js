const express = require("express");
const crypto = require("crypto");
const axios = require("axios");

const app = express();
app.use(express.json());

const makeCors = require("./lib/cors");
app.use(makeCors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = crypto.randomBytes(4).toString("hex");
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send({ error: "Title and content are required." });
  }

  const newPost = { id, title, content };
  posts[id] = newPost;

  axios
    .post("http://localhost:3003/events", {
      type: "PostCreated",
      data: newPost,
    })
    .catch((err) => {
      console.log("Error sending event to event bus:", err.message);
    });

  res.status(201).send(newPost);
});

app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);

  res.send({ status: "OK" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
