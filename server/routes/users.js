const router = require("express").Router();
let User = require("../models/user.model");

// TODO: Add input validation and user authentication!!!

// Get all Users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get the User matching given username
router.route("/:username").get((req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get the User matching given id
router.route("/id/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add new User
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json(`User ${username} added!`))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
