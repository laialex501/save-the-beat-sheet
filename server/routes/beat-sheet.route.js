const router = require("express").Router();
let BeatSheet = require("../models/beat-sheet.model");
const passport = require("passport");

// Authentication and authorization middleware
const { isLoggedIn, isAuthorizedBeatSheet } = require("../auth/auth-utils");

// HTML sanitization utility
const sanitizeBeatSheet = require("../utils/sanitize").sanitizeBeatSheet;

// Get All Beat Sheets
router
  .route("/")
  .post(
    [passport.authenticate("jwt", { session: false }), isLoggedIn],
    (req, res) => {
      console.log("Looking for beat sheets belonging to user " + req.user.id);
      const id = req.user.id;
      BeatSheet.find({ author_id: id })
        .then((beatSheets) => {
          res.status(200).send({ beatSheets: beatSheets });
        })
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

      return res.status(200).json(req.beatSheet);
    }
  );

// Create beat sheet
router
  .route("/create")
  .post(
    [passport.authenticate("jwt", { session: false }), isLoggedIn],
    (req, res) => {
      console.log(`Creating Beat Sheet for user ${req.user.id}`);

      // Acquire user data
      const name = req.user.name;
      const id = req.user.id;

      // Set field data
      const beatSheet = req.body.beatSheet;
      const beat_sheet_name = beatSheet.beat_sheet_name;
      const beat_sheet_description = beatSheet.beat_sheet_description;
      const acts = beatSheet.acts;

      // Create the new beat sheet
      var newBeatSheet = new BeatSheet({
        beat_sheet_name,
        beat_sheet_description,
        acts,
        author_username: name,
        author_id: id,
      });

      // Sanitize new beat sheet before saving
      newBeatSheet = sanitizeBeatSheet(newBeatSheet);

      newBeatSheet
        .save()
        .then(() => res.status(200).json(`Beat Sheet for user ${name} added!`))
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
      // The beat sheet that will replace the one we have in our database
      const reqBeatSheet = req.body.beatSheet;
      // console.log(reqBeatSheet);
      console.log(`Updating beat sheet with id ${id}`);
      BeatSheet.findById(id)
        .then((beatSheet) => {
          // Update sheet values
          beatSheet.beat_sheet_name = reqBeatSheet.beat_sheet_name;
          beatSheet.beat_sheet_description =
            reqBeatSheet.beat_sheet_description;
          beatSheet.author_username = reqBeatSheet.author_username;
          beatSheet.author_id = reqBeatSheet.author_id;
          beatSheet.acts = reqBeatSheet.acts;

          // Sanitize beat sheet
          beatSheet = sanitizeBeatSheet(beatSheet);

          // Save Beat Sheet to database
          beatSheet
            .save()
            .then(() => res.status(200).json(`Beat Sheet ${id} updated`))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    }
  );

// Delete Beat Sheet
router
  .route("/delete")
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
      console.log(`Deleting beat sheet with id ${id}`);

      // Delete beat sheet
      BeatSheet.findByIdAndDelete(id)
        .then(res.status(200).json(`Beat Sheet ${id} deleted`))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  );

module.exports = router;
