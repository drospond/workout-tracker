const mongoose = require("mongoose");

var path = require("path");

const workoutdb = require("../models/Workout");

module.exports = function (app) {
  app.get("/api/workouts", (req, res) => {
    workoutdb
      .find()
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    workoutdb
      .findOneAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body } },
        { new: true }
      )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.post("/api/workouts", (req, res) => {
    workoutdb
      .create(req.body)
      .then((newWorkout) => {
        res.json(newWorkout);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    workoutdb
    .find()
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
  });
};
