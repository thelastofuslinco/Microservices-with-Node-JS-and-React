const express = require("express");
const crypto = require("crypto");
const makeCors = require("./lib/cors");

const app = express();
app.use(express.json());
app.use(makeCors());

const posts = {};

app.get("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const postComments = posts[postId] || [];
  res.send(postComments);
});

app.post("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;

  const id = crypto.randomBytes(4).toString("hex");
  const { content } = req.body;

  const newComment = { id, content, postId };
  posts[postId] = posts[postId] || [];
  posts[postId].push(newComment);

  axios
    .post("http://localhost:3003/events", {
      type: "CommentCreated",
      data: newComment,
    })
    .catch((err) => {
      console.log("Error sending event to event bus:", err.message);
    });

  res.status(201).send(newComment);
});

app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);

  res.send({ status: "OK" });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
