const express = require("express");
const app = express();
const musicList = require("./musicList");
const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.get("/get-list", (req, res) => {
  res.status(200).json({
    status: 200,
    data: musicList,
  });
});

app.get("/get-music/:id", (req, res) => {
  const { id } = req.params;
  const music = musicList.filter((item) => item.id === id) || [];
  res.status(200).json({
    status: 200,
    data: !music.length ? "No song found!" : music[0],
  });
});

app.listen(PORT, () => {
  console.log(`connection is live at port : ${PORT} `);
});
