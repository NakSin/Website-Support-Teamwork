const router = require("express").Router();
let List = require("../models/list.model");
let Task = require("../models/task.model");

router.route("/:id").get((req, res) => {
  List.find(
    {
      _id: req.params.id,
    },
    { taskId: 1 }
  )
    .then((list) => {
      if (list) {
        Task.find({
          listId: list[0]._id,
        }).then((task) => {
          res.json(task);
        });
      }
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/").post((req, res) => {
  const taskname = req.body.name;
  const numberticket = req.body.numberTicket;
  const created = req.body.created;
  const listId = req.body.listId;
  const detail = req.body.detail;
  const ticketId = req.body.ticketId;
  const loading = req.body.loading;
  const label = req.body.label;
  const dueDate = req.body.dueDate;
  const newTask = new Task({
    taskname,
    numberticket,
    created,
    listId,
    detail,
    ticketId,
    loading,
    label,
    dueDate,
  });
  newTask
    .save()
    .then(() => res.json("Task Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/edit/:id").post((req, res) => {
  List.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        listname: req.body.newName,
      },
    },
    function (err, num) {}
  )
    .then(() => res.json("List Name Change"))
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
