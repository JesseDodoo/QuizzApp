const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scores");

router.get("/", scoresController.all);
router.get("/:id", scoresController.byId);

module.exports = router;
