const sanitizeHTML = require("sanitize-html");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const sanitizeHTMLConfig = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "blockquote",
    "p",
    "a",
    "ul",
    "ol",
    "nl",
    "li",
    "b",
    "i",
    "strong",
    "em",
    "strike",
    "abbr",
    "code",
    "hr",
    "br",
    "div",
    "table",
    "thead",
    "caption",
    "tbody",
    "tr",
    "th",
    "td",
    "pre",
    "iframe",
    "img",
  ],
};

// Sanitizes a html string, first cleaning the HTML and then sanitizing for XSS.
function sanitize(html) {
  return DOMPurify.sanitize(sanitizeHTML(html, sanitizeHTMLConfig));
}

function sanitizeActs(acts) {
  // Sanitize all acts
  const new_acts = acts.map((act) => {
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

  return new_acts;
}

// Cleans up the HTML fragments from beat sheet inputs and sanitize for XSS
function sanitizeBeatSheet(beatSheet) {
  // Initialize new beat sheet and sanitize top-level data,
  beatSheet.beat_sheet_name = sanitize(beatSheet.beat_sheet_name);
  beatSheet.beat_sheet_description = sanitize(beatSheet.beat_sheet_description);
  beatSheet.author_username = sanitize(beatSheet.author_username);
  beatSheet.author_id = sanitize(beatSheet.author_id);

  // Sanitize acts and beats
  const new_acts = sanitizeActs(beatSheet.acts);

  // Set sanitized acts and beats
  beatSheet.acts = new_acts;

  return beatSheet;
}

module.exports = { sanitize, sanitizeBeatSheet };
