const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BeatSchema = new Schema({
  beat_name: {
    type: String,
    required: true,
    default: "Untitled Beat",
    trim: true,
  },
  beat_description: {
    type: String,
    trim: true,
  },
});

const ActSchema = new Schema({
  act_name: {
    type: String,
    required: true,
    default: "Untitled Act",
    trim: true,
  },
  act_description: {
    type: String,
    trim: true,
  },
  beats: {
    type: [BeatSchema],
  },
});

const BeatSheetSchema = new Schema(
  {
    beat_sheet_name: {
      type: String,
      required: true,
      default: "Untitled Beat Sheet",
      trim: true,
    },
    beat_sheet_description: {
      type: String,
      trim: true,
    },
    author_username: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      required: true,
    },
    acts: {
      type: [ActSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const BeatSheet = mongoose.model("BeatSheet", BeatSheetSchema);

module.exports = BeatSheet;
