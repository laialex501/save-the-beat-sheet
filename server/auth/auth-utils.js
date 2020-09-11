const BeatSheet = require("../models/beat-sheet.model");

// Enable use of environmental variables
require("dotenv").config();

// Access protection middleware checking if user is logged in and present
const isLoggedIn = (req, res, next) => {
  // Check if a user was found
  if (!req.user) {
    return res.send(403, "Must log in to continue");
  }
  next();
};

// Middleware for checking if user is authorized for accessing a beat sheet referenced by its database id
const isAuthorizedBeatSheet = (req, res, next) => {
  const id = req.body.beatSheetID;
  if (!id) {
    return res
      .status(401)
      .send("Please specifiy a beat sheet ID in your request");
  }

  BeatSheet.findById(id)
    .then((beatSheet) => {
      if (!beatSheet) {
        // Beat sheet not found
        return res.status(401).send("Beat sheet not found");
      }

      // Author id of beat sheet does not match user id from jwt token
      if (beatSheet.author_id !== req.user.id) {
        return res.status(401).send("Not authorized to access this beat sheet");
      }

      // Make beat sheet available in following middleware
      req.beatSheet = beatSheet;
      return next();
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = { isLoggedIn, isAuthorizedBeatSheet };
