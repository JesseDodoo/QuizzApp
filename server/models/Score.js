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

  static updateScore(id,incrementor) {
    return new Promise(async (res, rej) => {
      try{
        const db = await init();
        const scoreData = await db.collection("scores").findOneAndUpdate({ id: id },{$inc:{"score": incrementor}}); 
        let score = new Score(scoreData);
        res(score)
      }catch (error){
        rej("Error updating score: " + error);
      }
    })
  }

  static newUser(username) {
    return new Promise(async (res, rej) => {
      try{
        const db = await init();
        const user = await db.collection("scores").insertOne({id: new ObjectId(), username: username})
        let newUser = new Score(user.ops[0])
        res(newUser)
      } catch (error){
        rej("Error creating user: " + error)
      }
    })
  
  }
}


module.exports = Score;
