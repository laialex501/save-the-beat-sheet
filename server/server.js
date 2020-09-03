const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");

// Run passport config (require syntax runs file)
const passportConfig = require("./config/passport-config");

// Allow use of environmental variables
require("dotenv").config();

const app = express();

// Enable cross-origin resource sharing
app.use(cors());

// Body parsing middleware for requests
app.use(bodyParser.json());

// Configure cookie to last 1 day in milliseconds and to be encrypted by a private session cookie key
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_COOKIE_KEY],
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

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
const authRouter = require("./routes/auth");

// Set routes
app.use("/", welcomeRouter);
app.use("/users", usersRouter);
app.use("/beatsheets", beatSheetRouter);
app.use("/auth", authRouter);

// Port config
const port = process.env.PORT || 5000;

// Run server
app.listen(port, () => console.log(`Server up and running on port ${port}`));
