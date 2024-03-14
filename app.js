const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const bucketRoutes = require("./src/routes/bucketRouter");
const objectRoutes = require("./src/routes/objectRouter");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/aws-service");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/auth", authRoutes);
app.use("/buckets", bucketRoutes);
app.use("/objects", objectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
