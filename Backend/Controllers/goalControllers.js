const asynchandler = require("express-async-handler");
const Goal = require("../Model/goalModel");

const getGoals = asynchandler(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
});

const postGoals = asynchandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);

    throw new Error("please fill text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.json(goal);
});

const updateGoals = asynchandler(async (req, res) => {

  const goal = await Goal.findById(req.params.id)

  if (!goal){
    res.status(400)
    throw new Error("Goal not found");
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.json(updateGoal);
});

const deleteGoals = asynchandler(async (req, res) => {

  const goal = await Goal.findOneAndDelete(req.params.id);

  if(!goal){
    res.status(400)
    throw new Error("Goal not found");
  }

  res.json({id: req.params.id});
});

module.exports = { getGoals, postGoals, updateGoals, deleteGoals };
