const router = require("express").Router();
let Task = require("../models/task.model");
let Ticket = require("../models/ticket.model");

router.route("/:id").get((req, res) => {
  Ticket.find({
    taskId: req.params.id,
  })
    .then((ticket) => {
      for (var i = 0; i < ticket.length; i++) {
        Task.updateOne(
          {
            _id: req.params.id,
          },
          {
            $addToSet: {
              ticketId: {
                $each: [
                  {
                    _id: ticket[i]._id,
                  },
                ],
              },
            },
          },
          function (err, num) {}
        );
      }
      res.json(ticket);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/").post((req, res) => {
  const ticketname = req.body.name;
  const checkdone = req.body.check;
  const created = req.body.created;
  const taskId = req.body.taskId;
  const newTicket = new Ticket({
    ticketname,
    checkdone,
    created,
    taskId,
  });
  newTicket
    .save()
    .then(() => res.json("Ticket Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/edit/:id").post((req, res) => {
  if (req.body.type == "editDetail") {
    Task.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          detail: req.body.description,
        },
      },
      function (err, num) {}
    )
      .then(() => res.json("Task Detail Added"))
      .catch((err) => res.status(400).json("Error" + err));
  } else if (req.body.type == "editName") {
    Task.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          taskname: req.body.description,
        },
      },
      function (err, num) {}
    )
      .then(() => res.json("Task Name Change"))
      .catch((err) => res.status(400).json("Error" + err));
  }
});

router.route("/remove").post((req, res) => {
  Task.updateOne(
    {
      "ticketId._id": { $eq: req.body.ticketId },
    },
    {
      $pull: {
        ticketId: { _id: req.body.ticketId },
      },
    },
    function (err, num) {}
  )
    .then(() => {
      Ticket.findByIdAndDelete(req.body.ticketId).then(() =>
        res.json("Ticket Delete")
      );
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/loading/:id").post((req, res) => {
  Task.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        loading: req.body.loading,
      },
    },
    function (err, num) {}
  )
    .then(() => res.json("Progress Bar Update"))
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
