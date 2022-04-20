const db = connect("mongodb://localhost:27017/quiz");

db.scores.drop();

db.scores.insertMany([
  { id: "625e8cad8cd8982042222e0d", username: "Harry", score: 150 },
  { id: "625e8cad8cd8982042222e0e", username: "Zeia", score: 130 },
  { id: "625e8cad8cd8982042222e0f", username: "Jesse", score: 200 },
  { id: "625e8cad8cd8982042222e10", username: "Rakib", score: 100 },
]);
