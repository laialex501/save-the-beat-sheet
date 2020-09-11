const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
// const cookieSession = require("cookie-session");

// Run passport config (require syntax runs file)
require("./auth/passport-config");

// Allow use of environmental variables
require("dotenv").config();

// Initialize express app
const app = express();

// Enable cross-origin resource sharing
const whitelist = [process.env.CLIENT_DOMAIN, process.env.SERVER_DOMAIN];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOptions));

// Body parsing middleware for requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie parsing middleware for requests
app.use(cookieParser());

// Initialize passport
app.use(passport.initialize());

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
const welcomeRouter = require("./routes/welcome.route");
const beatSheetRouter = require("./routes/beat-sheet.route");
const authRouter = require("./routes/auth.route");

// Set routes
app.use("/", welcomeRouter);
app.use("/beatsheets", beatSheetRouter);
app.use("/auth", authRouter);

// Port config
const port = process.env.PORT || process.env.SERVER_PORT;

// Run server
app.listen(port, () => console.log(`Server up and running on port ${port}`));
