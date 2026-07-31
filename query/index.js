const express = require("express");
const cors = require("cors");
const axios = require("axios");

const port = 3002;
const event_bus_url = "http://event-bus-clusterip-svc:3003/events";

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  switch (type) {
    case "PostCreated":
      posts[data.id] = { ...data, comments: [] };
      break;
    case "CommentCreated":
      posts[data.postId].comments.push(data);
      break;
    case "CommentUpdated":
      const post = posts[data.postId];
      if (post) {
        const comment = post.comments.find((c) => c.id === data.id);
        if (comment) {
          comment.status = data.status;
          comment.content = data.content;
        }
      }
      break;
    default:
      break;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ status: "OK" });
});

app.listen(port, async () => {
  console.log("Query service is running on port", port);

  const response = await axios.get(event_bus_url);
  const events = response.data;

  for (let event of events) {
    console.log("Processing event:", event.type);
    handleEvent(event.type, event.data);
  }
});
