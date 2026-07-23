const express = require("express");

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);

  axios.post("http://localhost:3000/events", req.body).catch((err) => {
    console.log("Error sending event to posts service:", err.message);
  });

  axios.post("http://localhost:3001/events", req.body).catch((err) => {
    console.log("Error sending event to comments service:", err.message);
  });

  axios.post("http://localhost:3002/events", req.body).catch((err) => {
    console.log("Error sending event to query service:", err.message);
  });
  res.send({ status: "OK" });
});

app.listen(3003, () => {
  console.log("Listening on 3003");
});
