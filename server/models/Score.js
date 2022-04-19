const { init } = require("../dbConfig/dbConfig");
const { ObjectId } = require("mongodb");

class Score {
  constructor(data) {
    this.username = data.username;
    this.score = data.score;
  }

  static all() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const scoresData = await db.collection("scores").find().toArray();
        let scores = scoresData.map((score) => new Score(score));
        res(scores);
      } catch (error) {
        rej("Error retrieving scores: " + error);
      }
    });
  }
}

module.exports = Score;
