const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scores");

router.get("/", scoresController.all);
router.get("/:id", scoresController.byId);
router.delete("/:id", scoresController.deleteUser);
router.patch("/", scoresController.update);
router.post("/", scoresController.newUser);

module.exports = router;
