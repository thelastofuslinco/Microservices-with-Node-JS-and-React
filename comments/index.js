const express = require("express");
const crypto = require("crypto");
const makeCors = require("./lib/cors");
const axios = require("axios");

const port = 3001;
const event_bus_url = "http://event-bus-clusterip-svc:3003/events";

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

  const newComment = { id, content, postId, status: "pending" };
  posts[postId] = posts[postId] || [];
  posts[postId].push(newComment);

  axios
    .post(event_bus_url, {
      type: "CommentCreated",
      data: newComment,
    })
    .catch((err) => {
      console.log("Error sending event to event bus:", err.message);
    });

  res.status(201).send(newComment);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "CommentModerated":
      const { id, postId, content, status } = data;

      const comment = posts[postId].find((c) => c.id === id);

      if (comment) {
        comment.status = status;
      }

      axios
        .post(event_bus_url, {
          type: "CommentUpdated",
          data: {
            id: id,
            content: content,
            postId: postId,
            status: status,
          },
        })
        .catch((err) => {
          console.log("Error sending event to event bus:", err.message);
        });

      break;
    default:
      break;
  }

  res.status(200).json({ message: "Content is acceptable." });
});

app.listen(port, () => {
  console.log("Comments service is running on port", port);
});
