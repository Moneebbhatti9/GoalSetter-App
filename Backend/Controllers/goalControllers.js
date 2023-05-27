const asynchandler = require("express-async-handler");
const Goal = require("../Model/goalModel");
const User = require("../Model/userModel")

const getGoals = asynchandler(async (req, res) => {
  const goals = await Goal.find({user: req.user.id});

  res.status(200).json(goals);
});

const postGoals = asynchandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);

    throw new Error("please fill text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.json(goal);
});

const updateGoals = asynchandler(async (req, res) => {

  const goal = await Goal.findById(req.params.id)

  if (!goal){
    res.status(400)
    throw new Error("Goal not found");
  }

  const user = await user.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error("User not found")
  }

  if (goal.user.toString() === user.id){
    res.status(401)
    throw new Error("User not Authorized")
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
