const db = connect("mongodb://localhost:27017/quiz");

db.scores.drop();

db.scores.insertMany([
  { username: "Harry", score: 150 },
  { username: "Zeia", score: 130 },
  { username: "Jesse", score: 200 },
  { username: "Rakib", score: 100 },
]);
