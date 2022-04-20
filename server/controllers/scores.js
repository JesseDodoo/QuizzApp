const Score = require("../models/Score");

async function all(req, res) {
  try {
    const scores = await Score.all();
    res.status(200).json(scores);
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function byId(req, res) {
  try {
    const score = await Score.findById(req.params.id);
    res.status(200).json(score);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function update(req,res){
  try{
    const update = await Score.updateScore(req.body.id, req.body.score); 
    res.status(200).json(update)
  } catch (err){
    res.status(500).send(err)
  }
}

async function newUser(req,res){
  try{
    const newUser = await Score.newUser(req.body.username);
    res.status(200).json(newUser)
  } catch(err) {
    res.status(500).send(err)
  }
}

module.exports = { all, byId, update, newUser };
