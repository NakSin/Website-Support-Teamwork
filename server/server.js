const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//Kết nối Cloud
// const uri = process.env.ATLAS_URI;

//Kết nối Local
const uri = "mongodb://localhost:27017/DATH";

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

const usersRouter = require("../routes/users");
const boardsRouter = require("../routes/boards");
const managerRouter = require("../routes/manager");
const listsboardRouter = require("../routes/listsboard");
const listsRouter = require("../routes/lists");
const tasksRouter = require("../routes/tasks");
const ticketsRouter = require("../routes/tickets");
const commentsRouter = require("../routes/comments");

app.use("/users", usersRouter);
app.use("/boards", boardsRouter);
app.use("/manager", managerRouter);
app.use("/listsboard", listsboardRouter);
app.use("/lists", listsRouter);
app.use("/tasks", tasksRouter);
app.use("/tickets", ticketsRouter);
app.use("/comments", commentsRouter);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
