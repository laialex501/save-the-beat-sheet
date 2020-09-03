const example_beat_sheet = {
  beat_sheet_name: "<h1>Save the Cat! Beat Sheet</h1>",
  beat_sheet_description:
    "<p>A beat sheet following the classic Save the Cat! method.</p>",
  acts: [
    {
      act_name: "<h2>Act 1</h2>",
      act_description: "<p>The beginning act.</p>",
      beats: [
        {
          beat_name: "<h3>Beat</h3>",
          beat_description: "<p>A beat.</p>",
        },
      ],
    },
    {
      act_name: "<h2>Act 2A</h2>",
      act_description: "<p>The first half of the middle act.</p>",
      beats: [
        {
          beat_name: "<h3>Beat</h3>",
          beat_description: "<p>A beat.</p>",
        },
      ],
    },
    {
      act_name: "<h2>Act 2B</h2>",
      act_description: "<p>The second half of the middle act.</p>",
      beats: [
        {
          beat_name: "<h3>Beat</h3>",
          beat_description: "<p>A beat.</p>",
        },
      ],
    },
    {
      act_name: "<h2>Act 3</h2>",
      act_description: "<p>The ending act.</p>",
      beats: [
        {
          beat_name: "<h3>Beat</h3>",
          beat_description: "<p>A beat.</p>",
        },
      ],
    },
  ],
  _id: "5f46fe0baa39050618ce4b3b",
  author_username: "Alex",
  author_id: "5f46fa36063fb9168c40cc55",
  createdAt: "2020-08-27T00:27:55.045Z",
  updatedAt: "2020-08-27T00:35:47.112Z",
  __v: 0,
};

const example_beat_sheet_list = [
  {
    acts: [
      {
        act_name: "Act 1",
        beats: [
          {
            beat_name: "Beat 1",
            _id: "5f46ffe33123396fd03778fd",
            beat_description: "The first beat",
          },
          {
            beat_name: "Beat 2",
            _id: "5f46ffe33123396fd03778fe",
            beat_description: "The second beat",
          },
        ],
        _id: "5f46ffe33123396fd03778fc",
        act_description: "The first act",
      },
      {
        act_name: "Act 2",
        beats: [
          {
            beat_name: "Beat 3",
            _id: "5f46ffe33123396fd0377900",
            beat_description: "The third beat",
          },
          {
            beat_name: "Beat 4",
            _id: "5f46ffe33123396fd0377901",
            beat_description: "The fourth beat",
          },
          {
            beat_name: "Beat 5",
            _id: "5f46ffe33123396fd0377902",
            beat_description: "The fifth beat",
          },
        ],
        _id: "5f46ffe33123396fd03778ff",
        act_description: "The second act",
      },
      {
        act_name: "Act 3",
        beats: [],
        _id: "5f46ffe33123396fd0377903",
        act_description: "The third act",
      },
    ],
    beat_sheet_name: "Save the Beat Sheet!",
    _id: "5f46fe0baa39050618ce4b3b",
    beat_sheet_description: "A beat sheet",
    author_username: "Alex",
    author_id: "5f46fa36063fb9168c40cc55",
    createdAt: "2020-08-27T00:27:55.045Z",
    updatedAt: "2020-08-27T00:35:47.112Z",
    __v: 0,
  },
  {
    acts: [
      {
        act_name: "Act 1",
        beats: [
          {
            beat_name: "Beat 1",
            _id: "5f46ffe33123396fd03778fd",
            beat_description: "The first beat",
          },
          {
            beat_name: "Beat 2",
            _id: "5f46ffe33123396fd03778fe",
            beat_description: "The second beat",
          },
        ],
        _id: "5f46ffe33123396fd03778fc",
        act_description: "The first act",
      },
      {
        act_name: "Act 2",
        beats: [
          {
            beat_name: "Beat 3",
            _id: "5f46ffe33123396fd0377900",
            beat_description: "The third beat",
          },
          {
            beat_name: "Beat 4",
            _id: "5f46ffe33123396fd0377901",
            beat_description: "The fourth beat",
          },
          {
            beat_name: "Beat 5",
            _id: "5f46ffe33123396fd0377902",
            beat_description: "The fifth beat",
          },
        ],
        _id: "5f46ffe33123396fd03778ff",
        act_description: "The second act",
      },
      {
        act_name: "Act 3",
        beats: [],
        _id: "5f46ffe33123396fd0377903",
        act_description: "The third act",
      },
    ],
    beat_sheet_name: "Save the Beat Sheet 2!",
    _id: "id2",
    beat_sheet_description: "A beat sheet 2",
    author_username: "Alex",
    author_id: "5f46fa36063fb9168c40cc55",
    createdAt: "2020-08-27T00:27:55.045Z",
    updatedAt: "2020-08-27T00:35:47.112Z",
    __v: 0,
  },
];

const blank_beat_sheet = {
  acts: [],
  beat_sheet_name: "<h1>Untitled Beat Sheet</h1>",
  beat_sheet_description: "<p>Describe your story here.</p>",
};

const classic_beat_sheet = {
  beat_sheet_name: "<h1>Save the Cat! Beat Sheet</h1>",
  beat_sheet_description:
    "<p>A beat sheet following the classic Save the Cat! method.</p>",
  acts: [
    {
      act_name: "<h2>Act 1</h2>",
      act_description: "<p>The beginning act.</p>",
      beats: [
        {
          beat_name: "<h3>Opening Image</h3>",
          beat_description:
            "<p>A visual that represents the struggle & tone of the story. A snapshot of the main character’s problem, before the adventure begins.</p>",
        },
        {
          beat_name: "<h3>Theme Stated</h3>",
          beat_description:
            '<p>Expand on the "before" snapshot. Present the main character’s world as it is, and what is missing in their life.</p>',
        },
        {
          beat_name: "<h3>Set-up</h3>",
          beat_description:
            "<p>What your story is about; the message, the truth. Usually, it is spoken to the main character or in their presence, but they don’t understand the truth…not until they have some personal experience and context to support it.</p>",
        },
        {
          beat_name: "<h3>Catalyst</h3>",
          beat_description:
            '<p>The moment where life as it is changes. It is the telegram, the act of catching your loved-one cheating, allowing a monster onboard the ship, meeting the true love of your life, etc. The "before" world is no more, change is underway.</p>',
        },
        {
          beat_name: "<h3>Debate</h3>",
          beat_description:
            "<p>But change is scary and for a moment, or a brief number of moments, the main character doubts the journey they must take. Can I face this challenge? Do I have what it takes? Should I go at all? It is the last chance for the hero to chicken out.</p>",
        },
        {
          beat_name: "<h3>Break Into Two</h3>",
          beat_description:
            '<p>The main character makes a choice and the journey begins. We leave the "Thesis" world and enter the upside-down, opposite world of Act Two.</p>',
        },
      ],
    },
    {
      act_name: "<h2>Act 2A</h2>",
      act_description: "<p>The first half of the middle act.</p>",
      beats: [
        {
          beat_name: "<h3>B Story</h3>",
          beat_description:
            '<p>This is when there’s a discussion about the Theme – the nugget of truth. Usually, this discussion is between the main character and the love interest. So, the B Story is usually called the "love story".</p>',
        },
        {
          beat_name: "<h3>Fun and Games</h3>",
          beat_description:
            "<p>This is the fun part of the story. The Fun & Games is the first half of Act II where the audience is entertained asthe main character explores the new world and overcomes the type of obstacles they have been promised by the premise of the film, it’s genre, even it’s one-sheet poster.This is when the detective finds his clues and interviews his first witnesses to the murder mystery, when Indiana Jones tracks down the possible resting place of the Arc, when Harry & Sally are stuck together over and over seeming to annoy one another.The Fun & Games are what we came to see the movie for!</p>",
        },
        {
          beat_name: "<h3>Midpoint</h3>",
          beat_description:
            '<p>Dependent upon the story, this moment is when everything is "great" or everything is "awful". The main character either gets everything they think they want ("great") or doesn’t get what they think they want at all ("awful"). But not everything we think we want is what we actually need in the end.</p>',
        },
      ],
    },
    {
      act_name: "<h2>Act 2B</h2>",
      act_description: "<p>The second half of the middle act.</p>",
      beats: [
        {
          beat_name: "<h3>Bad Guys Close In</h3>",
          beat_description:
            '<p>Doubt, jealousy, fear, foes both physical and emotional regroup to defeat the main character’s goal, and the main character’s "great"/"awful" situation disintegrates.</p>',
        },
        {
          beat_name: "<h3>All is Lost</h3>",
          beat_description:
            '<p>The opposite moment from the Midpoint: "awful"/"great". The moment that the main character realizes they’ve lost everything they gained, or everything they now have has no meaning. The initial goal now looks even more impossible than before. And here, something or someone dies. It can be physical or emotional, but the death of something old makes way for something new to be born.</p>',
        },
        {
          beat_name: "<h3>Dark Night of the Soul</h3>",
          beat_description:
            '<p>The main character hits bottom, and wallows in hopelessness. The Why hast thou forsaken me, Lord? moment. Mourning the loss of what has "died" – the dream, the goal, the mentor character, the love of your life, etc. But, you must fall completely before you can pick yourself back up and try again.</p>',
        },
        {
          beat_name: "<h3>Break Into Three</h3>",
          beat_description:
            "<p>Thanks to a fresh idea, new inspiration, or last-minute Thematic advice from the B Story (usually the love interest), the main character chooses to try again.</p>",
        },
      ],
    },
    {
      act_name: "<h2>Act 3</h2>",
      act_description: "<p>The ending act.</p>",
      beats: [
        {
          beat_name: "<h3>Finale</h3>",
          beat_description:
            '<p>The main character confronts the antagonist or force of antagonism with new strength. This time around, the main character incorporates the Theme –the nugget of truth that nowmakes sense to them –into their fight because they have experience from the A Story and context from the B Story. So we can say the main character has left the "Anti-thesis" world and entered the "Synthesis" world.Here the journey will beresolved, one way or another.</p>',
        },
        {
          beat_name: "<h3>Final Image</h3>",
          beat_description:
            "<p>Opposite of Opening Image, proving, visually, that a change has occurred within the character.</p>",
        },
      ],
    },
  ],
};

const default_beat_sheets = [
  {
    beat_sheet_display_name: "Blank Beat Sheet",
    beat_sheet_data: blank_beat_sheet,
  },
  {
    beat_sheet_display_name: "Classic Beat Sheet",
    beat_sheet_data: classic_beat_sheet,
  },
];

const dev_user = {
  author_username: "Alex",
  author_id: "5f46fa36063fb9168c40cc55",
};

export default {
  example_beat_sheet,
  example_beat_sheet_list,
  default_beat_sheets,
  dev_user,
};
