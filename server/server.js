const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");
const debug = require("debug")("server");
const compression = require("compression");
const helmet = require("helmet");

// Run passport config (require syntax runs file)
require("./auth/passport-config");

// Allow use of environmental variables
require("dotenv").config();

// Initialize express app
const app = express();
debug("Initialized express app");

// Enable cross-origin resource sharing
const whitelist = process.env.CORS_WHITELIST.split(", ");
debug("CORS whitelist is: ", whitelist);
const corsOptions = {
  origin: (origin, callback) => {
    // Debug for checking origin of requests
    debug("origin: " + origin);
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

// Middleware to set HTTP headers for protecting against common vulnerabilities
app.use(helmet());

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

// Compress HTTP response of all routes for performance
app.use(compression());

// Router config
//const indexRouter = require("./routes/index.route");
const beatSheetRouter = require("./routes/beat-sheet.route");
const authRouter = require("./routes/auth.route");

// Set routes
//app.use("/api/", indexRouter);
app.use("/api/beatsheets", beatSheetRouter);
app.use("/api/auth", authRouter);

// If no route is found, send the static React app
//app.use(express.static(path.join(__dirname, "../client/build")));
/*app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build"));
});*/

// Port config
const port = process.env.PORT || process.env.SERVER_PORT;

// Run server
app.listen(port, () => console.log(`Server up and running on port ${port}`));
