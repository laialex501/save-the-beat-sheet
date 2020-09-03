const sanitizeHTML = require("sanitize-html");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// Sanitizes a html string, first cleaning the HTML and then sanitizing for XSS.
function sanitize(html) {
  return DOMPurify.sanitize(sanitizeHTML(html));
}

// Cleans up the HTML fragments from beat sheet inputs and sanitize for XSS
function sanitizeBeatSheet(beatSheet) {
  // Initialize new beat sheet and sanitize top-level data
  const newBeatSheet = {
    beat_sheet_name: sanitize(beatSheet.beat_sheet_name),
    beat_sheet_description: sanitize(beatSheet.beat_sheet_description),
    author_username: sanitize(beatSheet.author_username),
    author_id: sanitize(beatSheet.author_id),
  };

  // Sanitize acts and beats
  const new_acts = beatSheet.acts.map((act) => {
    // Initialize new act and sanitize top-level data
    const new_act = {
      act_name: sanitize(act.act_name),
      act_description: sanitize(act.act_description),
    };

    // Sanitize beats
    const new_beats = act.beats.map((beat) => {
      const new_beat = {
        beat_name: sanitize(beat.beat_name),
        beat_description: sanitize(beat.beat_description),
      };
      return new_beat;
    });

    // Set sanitized beats
    new_act.beats = new_beats;

    return new_act;
  });

  // Set sanitized acts and beats
  newBeatSheet.acts = new_acts;

  return newBeatSheet;
}

const testBeatSheet = {
  beat_sheet_name: "save the cat",
  _id: "5f4963a514bb1b3d9c24d944",
  beat_sheet_description: "a beat sheet",
  author_username: "Alex",
  author_id: "5f46fa36063fb9168c40cc55",
  acts: [
    {
      act_name: "act 1",
      beats: [
        {
          beat_name: "beat 1",
          _id: "5f4963a514bb1b3d9c24d946",
          beat_description: "the first beat",
        },
        {
          beat_name: "beat 2",
          _id: "5f4963a514bb1b3d9c24d947",
          beat_description: "the second beat",
        },
      ],
      _id: "5f4963a514bb1b3d9c24d945",
      act_description: "the first act",
    },
    {
      act_name: "act 2",
      beats: [
        {
          beat_name: "beat 3",
          _id: "5f4963a514bb1b3d9c24d949",
          beat_description: "the third beat",
        },
        {
          beat_name: "beat 4",
          _id: "5f4963a514bb1b3d9c24d94a",
          beat_description: "the fourth beat",
        },
      ],
      _id: "5f4963a514bb1b3d9c24d948",
      act_description: "the second act",
    },
  ],
  createdAt: "2020-08-28T20:05:57.058Z",
  updatedAt: "2020-08-28T20:07:11.361Z",
  __v: 0,
};

console.log(sanitizeBeatSheet(testBeatSheet));
