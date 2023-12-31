const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const streamersRouter = require("./routes/streamers");

app.use("/streamers", streamersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
