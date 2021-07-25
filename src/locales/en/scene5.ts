export default {
  "5-0": "You begin to prepare for this new journey.",
  "5-1": "You pack up your bags...",
  "5-2": "...you find a journal. A journal kept safe through the depths of time.",
  "5-3": ["ลองให้กาลเวลาพาเธอย้อนกลับไปดู", "การเดินทางที่ผ่านมา", "ของเธอกันสักหน่อยดีไหม"],
  "5-4": {
    q: "Shall we take the time to look back upon your past journey?",
    c1: ["Yes, I’m ready", "/6-0"],
    c2: ["No, I’m not", "/5-5-1"],
  },
  "5-5-1": "Among the bad memories, there may still be good ones.",
  "5-5-2": "The past may be painful, but it is your choice to remember and learn.",
  "5-5-3": {
    q: "Would you like to give your past journey a chance?",
    c1: ["Yes, I would", "/6-0"],
    c2: ["No", "/8-0"],
  },
};
