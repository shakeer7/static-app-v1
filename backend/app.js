const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload");

const app = express();

app.use(cors());

app.use("/api", uploadRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "UP"
  });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
