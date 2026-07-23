const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const makeCors = require("./lib/cors");
app.use(makeCors());

const posts = {
  1: { id: 1, title: "First Post", content: "This is the first post." },
};

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

  res.status(201).send(newPost);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
