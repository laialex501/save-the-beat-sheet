const router = require("express").Router();
let BeatSheet = require("../models/beat-sheet.model");
const passport = require("passport");

// Authentication and authorization middleware
const { isLoggedIn, isAuthorizedBeatSheet } = require("../auth/auth-utils");

// HTML sanitization utility
const sanitizeBeatSheet = require("../utils/sanitize").sanitizeBeatSheet;

// Get Beat Sheets
router
  .route("/")
  .post(
    [passport.authenticate("jwt", { session: false }), isLoggedIn],
    (req, res) => {
      console.log("Looking for beat sheets belonging to user " + req.user.id);
      const id = req.user.id;
      BeatSheet.find({ author_id: id })
        .then((beatSheets) => res.json(beatSheets))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  );

// Get Beat Sheet by ID
router
  .route("/get")
  .post(
    [
      passport.authenticate("jwt", { session: false }),
      isLoggedIn,
      isAuthorizedBeatSheet,
    ],
    (req, res) => {
      console.log(`Looking for beat sheet with id ${req.body.beatSheetID}`);
      if (!req.beatSheet) {
        return res.status(401).send("Beat sheet not found");
      }

      return res.json(req.beatSheet);
    }
  );

// Create beat sheet
router
  .route("/create")
  .post(
    [passport.authenticate("jwt", { session: false }), isLoggedIn],
    (req, res) => {
      console.log(
        `Creating Beat Sheet with content ${req.body.beatSheet} for user ${req.user.username}`
      );

      // Acquire user data
      const username = req.user.username;
      const id = req.user.id;

      // Set field data
      const beatSheet = req.body.beatSheet;
      const beat_sheet_name = beatSheet.beat_sheet_name;
      const beat_sheet_description = beatSheet.beat_sheet_description;
      const acts = beatSheet.acts;

      // Create the new beat sheet
      const newBeatSheet = new BeatSheet({
        beat_sheet_name,
        beat_sheet_description,
        acts,
        author_username: username,
        author_id: id,
      });

      // Sanitize new beat sheet before saving
      newBeatSheet = sanitizeBeatSheet(newBeatSheet);

      newBeatSheet
        .save()
        .then(() => res.json(`Beat Sheet for user ${username} added!`))
        .catch((err) => res.status(400).json("Error " + err));
    }
  );

// Update Beat Sheet
router
  .route("/update")
  .post(
    [
      passport.authenticate("jwt", { session: false }),
      isLoggedIn,
      isAuthorizedBeatSheet,
    ],
    (req, res) => {
      // Check if beat sheet is present
      if (!req.beatSheet) {
        return res.status(401).send("Beat sheet not found");
      }

      const id = req.body.beatSheetID;
      console.log(`Updating beat sheet with id ${id}`);
      BeatSheet.findById(id)
        .then((beatSheet) => {
          // Update sheet values
          beatSheet.beat_sheet_name = req.body.beat_sheet_name;
          beatSheet.beat_sheet_description = req.body.beat_sheet_description;
          beatSheet.author_username = req.body.author_username;
          beatSheet.author_id = req.body.author_id;
          beatSheet.acts = req.body.acts;

          // Sanitize beat sheet
          beatSheet = sanitizeBeatSheet(beatSheet);

          // Save Beat Sheet to database
          beatSheet
            .save()
            .then(() => res.json(`Beat Sheet ${id} updated`))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    }
  );

// Delete Beat Sheet
router
  .route("/delete")
  .delete(
    [
      passport.authenticate("jwt", { session: false }),
      isLoggedIn,
      isAuthorizedBeatSheet,
    ],
    (req, res) => {
      // Check if beat sheet is present
      if (!req.beatSheet) {
        return res.status(401).send("Beat sheet not found");
      }

      const id = req.body.beatSheetID;
      console.log(`Deleting beat sheet with id ${id}`);

      // Delete beat sheet
      BeatSheet.findByIdAndDelete(id)
        .then(res.json(`Beat Sheet ${id} deleted`))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  );

module.exports = router;
