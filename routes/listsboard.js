const router = require("express").Router();
let List = require("../models/list.model");
let Task = require("../models/task.model");
let Ticket = require("../models/ticket.model");
let Comment = require("../models/comment.model");

process.env.SECRET_KEY = "secret";

router.route("/:id").get((req, res) => {
  List.find({
    boardId: req.params.id,
  })
    .then((boardList) => {
      if (boardList) {
        const listId = [];
        for (var i = 0; i < boardList.length; i++) {
          listId.push(boardList[i]._id);
        }
        Task.find({
          listId: { $in: listId },
        }).then((task) => {
          res.json({ boardList, task });
          if (task) {
            for (var i = 0; i < task.length; i++) {
              List.updateOne(
                {
                  _id: { $in: task[i].listId },
                },
                {
                  $addToSet: {
                    taskId: {
                      $each: [
                        {
                          _id: task[i]._id,
                        },
                      ],
                    },
                  },
                },
                function (err, num) {}
              );
            }
          }
        });
      }
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/").post((req, res) => {
  const listname = req.body.name;
  const numbertask = req.body.numberTask;
  const created = req.body.created;
  const boardId = req.body.boardId;
  const taskId = [];
  const newList = new List({ listname, numbertask, created, boardId, taskId });
  newList
    .save()
    .then(() => res.json("List Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/remove").post((req, res) => {
  Task.find(
    {
      listId: req.body.listId,
    },
    { _id: 1 },
    function (err, num) {}
  )
    .then((taskId) => {
      for (var i = 0; i < taskId.length; i++) {
        Comment.deleteMany({
          taskId: taskId[i]._id,
        }).catch((err) => res.status(400).json("Error:" + err));
        Ticket.deleteMany({
          taskId: taskId[i]._id,
        }).catch((err) => res.status(400).json("Error:" + err));
      }
      Task.deleteMany({
        listId: req.body.listId,
      }).catch((err) => res.status(400).json("Error:" + err));

      List.findByIdAndDelete(req.body.listId)
        .then(() => res.json("List Delete"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/removeTask/:id").delete((req, res) => {
  Task.findOne(
    {
      _id: req.params.id,
    },
    { _id: 0, listId: 1 }
  )
    .then((list) => {
      Comment.deleteMany({
        taskId: req.params.id,
      }).catch((err) => res.status(400).json("Error:" + err));

      Ticket.deleteMany({
        taskId: req.params.id,
      }).catch((err) => res.status(400).json("Error:" + err));

      List.updateOne(
        { _id: list.listId },
        { $pull: { taskId: { _id: req.params.id } } }
      )
        .then(() => res.json("List Update"))
        .catch((err) => res.status(400).json("Error:" + err));

      Task.findByIdAndDelete(req.params.id).catch((err) =>
        res.status(400).json("Error:" + err)
      );
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
