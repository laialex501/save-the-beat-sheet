const BeatSheet = require("../models/beat-sheet.model");
const debug = require("debug")("auth-utils");

// Enable use of environmental variables
require("dotenv").config();

// Access protection middleware checking if user is logged in and present
const isLoggedIn = (req, res, next) => {
  // Check if a user was found
  if (!req.user) {
    debug("Must log in to continue");
    return res.send(403, "Must log in to continue");
  }
  next();
};

// Middleware for checking if user is authorized for accessing a beat sheet referenced by its database id
const isAuthorizedBeatSheet = (req, res, next) => {
  const id = req.body.beatSheetID;
  if (!id) {
    debug("Must specify a beat sheet ID in request");
    return res
      .status(401)
      .send("Please specifiy a beat sheet ID in your request");
  }

  BeatSheet.findById(id)
    .then((beatSheet) => {
      if (!beatSheet) {
        // Beat sheet not found
        debug("Beat sheet not found");
        return res.status(404).send("Beat sheet not found");
      }

      // Author id of beat sheet does not match user id from jwt token
      if (beatSheet.author_id !== req.user.id) {
        debug("Not authorized to access this beat sheet");
        return res.status(401).send("Not authorized to access this beat sheet");
      }

      // Make beat sheet available in following middleware
      req.beatSheet = beatSheet;
      return next();
    })
    .catch((err) => {
      debug("Error: " + err);
      return res.status(400).json("Error: " + err);
    });
};

module.exports = { isLoggedIn, isAuthorizedBeatSheet };
