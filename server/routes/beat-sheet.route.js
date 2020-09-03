const router = require("express").Router();
let BeatSheet = require("../models/beat-sheet.model");
const isLoggedIn = require("../utils/auth-utils").isLoggedIn;

const sanitizeBeatSheet = require("../utils/sanitize").sanitizeBeatSheet;

// TODO: Add input validation and user authorization!!!

// Get Beat Sheets
router.route("/").get(isLoggedIn, (req, res) => {
  console.log("Looking for beat sheets belonging to user " + req.user.username);
  const username = req.body.username;
  BeatSheet.find({ author_username: username })
    .then((beatSheet) => res.json(beatSheet))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get all Beat Sheets
router.route("/api/all").get((req, res) => {
  // TODO: Remove console.log
  console.log("Looking for all beat sheets");
  // TODO: Only display authorized beat sheets
  BeatSheet.find()
    .then((beatSheets) => res.json(beatSheets))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get Beat Sheets by Username
router.route("/api/users/:username").get((req, res) => {
  const username = req.params.username;
  // TODO: Remove console.log
  console.log(`Looking for beats sheets belonging to ${username}`);
  // TODO: Only display beat sheets if authorized
  BeatSheet.find({ author_username: username })
    .then((beatSheet) => res.json(beatSheet))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get Beat Sheets by Author_ID
router.route("/api/users/id/:author_id").get((req, res) => {
  const author_id = req.params.author_id;
  // TODO: Remove console.log
  console.log(`Looking for beats sheets belonging to ${author_id}`);
  // TODO: Only display beat sheets if authorized
  BeatSheet.find({ author_id: author_id })
    .then((beatSheets) => res.json(beatSheets))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get Beat Sheet by ID
router.route("/api/:id").get((req, res) => {
  const id = req.params.id;
  // TODO: Remove console.log
  console.log(`Looking for beat sheet with id ${id}`);

  // TODO: Only display beat sheet if authorized
  BeatSheet.findById(id)
    .then((beatSheet) => res.json(beatSheet))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create Beat Sheet
router.route("/api/create").post((req, res) => {
  // TODO: Remove console.log
  console.log(`Creating Beat Sheet with content ${req.body}`);

  const beat_sheet_name = req.body.beat_sheet_name;
  const beat_sheet_description = req.body.beat_sheet_description;
  const author_username = req.body.author_username;
  const author_id = req.body.author_id;
  const acts = req.body.acts;

  // Create the new beat sheet
  const newBeatSheet = new BeatSheet({
    beat_sheet_name,
    beat_sheet_description,
    author_username,
    author_id,
    acts,
  });

  // Sanitize new beat sheet before saving
  newBeatSheet = sanitizeBeatSheet(newBeatSheet);

  newBeatSheet
    .save()
    .then(() => res.json("Beat Sheet added!"))
    .catch((err) => res.status(400).json("Error " + err));
});

// Update Beat Sheet
router.route("/api/update/:id").post((req, res) => {
  const id = req.params.id;
  // TODO: Remove console.log
  console.log(`Updating beat sheet with id ${id}`);
  // TODO: Only update beat sheet if authorized
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

      beatSheet
        .save()
        .then(() => res.json(`Beat Sheet ${id} updated`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete Beat Sheet
router.route("/api/:id").delete((req, res) => {
  const id = req.params.id;
  // TODO: Remove console.log
  console.log(`Deleting beat sheet with id ${id}`);
  // TODO: Only display beat sheet if authorized
  BeatSheet.findByIdAndDelete(id)
    .then(res.json(`Beat Sheet ${id} deleted`))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
