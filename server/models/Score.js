const { init } = require("../dbConfig/dbConfig");
const { ObjectId } = require("mongodb");

class Score {
  constructor(data) {
    this.id = data._id;
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
        console.log("running");
        const db = await init();
        const scoreData = await db
          .collection("scores")
          .findOne({ _id: ObjectId(id) });

        let score = new Score(scoreData);
        res(score);
      } catch (error) {
        rej("Error retrieving user data: " + error);
      }
    });
  }

  static updateScore(id, incrementor) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const scoreData = await db
          .collection("scores")
          .findOneAndUpdate(
            { _id: ObjectId(id) },
            { $inc: { score: incrementor } }
          );
        let score = new Score(scoreData);
        res(score);
      } catch (error) {
        rej("Error updating score: " + error);
      }
    });
  }

  static newUser(username) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const user = await db
          .collection("scores")
          .insertOne({ username: username, score: 0 });
        let newUser = new Score(user);
        res(newUser);
      } catch (error) {
        rej("Error creating user: " + error);
      }
    });
  }
  delete() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        await db.collection("scores").deleteOne({ _id: this.id });
        res(`${this.username} deleted`);
      } catch (error) {
        rej("Error deleting user");
      }
    });
  }
}

module.exports = Score;