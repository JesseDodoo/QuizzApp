const { init } = require("../dbConfig/dbConfig");
const { ObjectId } = require("mongodb");

class Score {
  constructor(data) {
    this.id = data.id;
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
  static findById(id) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const scoreData = await db.collection("scores").findOne({ id: id });
        let score = new Score(scoreData);
        res(score);
      } catch (error) {
        rej("Error retrieving user data: " + error);
      }
    });
  }
}

module.exports = Score;
