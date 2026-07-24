const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);

  // Send event to posts service
  axios.post("http://localhost:3000/events", req.body).catch((err) => {
    console.log("Error sending event to posts service:", err.message);
  });

  // Send event to comments service
  axios.post("http://localhost:3001/events", req.body).catch((err) => {
    console.log("Error sending event to comments service:", err.message);
  });

  // Send event to query service
  axios.post("http://localhost:3002/events", req.body).catch((err) => {
    console.log("Error sending event to query service:", err.message);
  });

  // Send event to moderation service
  axios.post("http://localhost:3004/events", req.body).catch((err) => {
    console.log("Error sending event to moderation service:", err.message);
  });

  res.send({ status: "OK" });
});

app.listen(3003, () => {
  console.log("Listening on 3003");
});
