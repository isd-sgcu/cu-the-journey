export default {
  "3-0":
    "You, (name), have been on a long and wearing journey. After all that has happened, today you finally have some time to yourself.",
  "3-1": {
    q: "What kind of day is it today?",
    c1: ["A raging storm", "3-2"],
    c2: ["Nice and bright", "3-2"],
    c3: ["Extra sunny", "3-2"],
    c4: ["Rainy and wet", "3-2"],
  },
  "3-2": "You recall - this morning a letter came for you in the mail.",
  "3-3": {
    q: "Do you remember where you put the letter?",
    c1: ["On your desk", "/3-4"],
    c2: ["On the dining table", "/3-4"],
    c3: ["On the bed", "/3-4"],
    c4: ["Inside a drawer", "/3-4"],
    c5: ["I have no idea", "/3-3-1"],
  },
  "3-4": "Guess you’ll have to look again……. There, found it!",
  "3-5": "You open up the letter, and begin to read.",
};
