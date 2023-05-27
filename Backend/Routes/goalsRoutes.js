const express = require("express");
const router = express.Router();
const {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
} = require("../Controllers/goalControllers");

const {protect} = require("../Middleware/authMiddleware")

router.route("/").get(protect, getGoals).post(protect,postGoals);

router.route("/:id").put(protect,updateGoals).delete(protect,deleteGoals);

module.exports = router;
