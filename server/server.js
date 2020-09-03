const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Allow use of environmental variables
require("dotenv").config();

const app = express();

// Enable cross-origin resource sharing
app.use(cors());

// Body parsing middleware for requests
app.use(bodyParser.json());

// DB Config
const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err));
const connection = mongoose.connection;
connection.once("open", () => console.log("Successfully connected to MongoDB"));

// Router config
const welcomeRouter = require("./routes/welcome");
const usersRouter = require("./routes/users");
const beatSheetRouter = require("./routes/beatSheet");

// Set routes
app.use("/", welcomeRouter);
app.use("/users", usersRouter);
app.use("/beatsheets", beatSheetRouter);

// Port config
const port = process.env.PORT || 5000;

// Run server
app.listen(port, () => console.log(`Server up and running on port ${port}`));
