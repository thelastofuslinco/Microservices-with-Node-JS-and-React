const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "PostCreated":
      posts[data.id] = { ...data, comments: [] };
      break;
    case "CommentCreated":
      posts[data.postId].comments.push(data);
      break;
    default:
      break;
  }

  console.log("Posts:", posts);

  res.send({ status: "OK" });
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
