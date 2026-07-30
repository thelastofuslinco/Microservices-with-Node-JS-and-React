const express = require("express");
const axios = require("axios");

const port = process.env.PORT || 3004;

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "CommentCreated":
      const status = data.content.includes("orange") ? "rejected" : "approved";

      axios
        .post("http://localhost:3003/events", {
          type: "CommentModerated",
          data: {
            id: data.id,
            content: data.content,
            postId: data.postId,
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
  console.log("Moderation service is running on port", port);
});
