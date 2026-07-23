const express = require("express");
const crypto = require("crypto");
const makeCors = require("./lib/cors");

const app = express();
app.use(express.json());
app.use(makeCors());

const posts = {
  1: [{ id: 1, content: "This is a comment on the first post." }],
};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const postComments = posts[id] || [];
  res.send(postComments);
});

app.post("/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  const commentId = crypto.randomBytes(4).toString("hex");
  const { content } = req.body;

  const newComment = { id: commentId, content };
  posts[id] = posts[id] || [];
  posts[id].push(newComment);

  res.status(201).send(newComment);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
