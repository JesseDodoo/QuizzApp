const db = connect("mongodb://localhost:27017/quiz");

db.scores.drop();

db.scores.insertMany([
  { id: "1", score: "100", name: "Zeia" },
  { id: "2", score: "50", name: "Jesse" },
  { id: "3", score: "200", name: "Harry" },
]);
