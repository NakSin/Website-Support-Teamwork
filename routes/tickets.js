const router = require("express").Router();
let Ticket = require("../models/ticket.model");

router.route("/check/:id").post((req, res) => {
  Ticket.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        checkdone: req.body.check,
      },
    },
    function (err, num) {}
  )
    .then(() => res.json("Ticket Check Done Update"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/edit/:id").post((req, res) => {
  Ticket.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        ticketname: req.body.newName,
      },
    },
    function (err, num) {}
  )
    .then(() => res.json("Ticket Name Change"))
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
