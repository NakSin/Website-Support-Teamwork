const router = require("express").Router();
let Board = require("../models/board.model");
const jwt = require("jsonwebtoken");

process.env.SECRET_KEY = "secret";

router.route("/:id").get((req, res) => {
  Board.find({
    "usersjoin._id": req.params.id,
  })
    .then((userBoard) => {
      if (userBoard) {
        res.json(userBoard);
      }
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/").post((req, res) => {
  const boardname = req.body.name;
  const ticket = req.body.ticket;
  const created = req.body.created;
  const userId = req.body.userId;
  const date = new Date();
  const usersjoin = [
    {
      _id: userId,
      role: "Board Master",
      datejoin:
        date.getHours() +
        ":" +
        date.getMinutes() +
        " - " +
        date.getDate() +
        "/" +
        date.getMonth() +
        "/" +
        date.getFullYear(),
    },
  ];
  const newBoard = new Board({ boardname, ticket, created, usersjoin });

  newBoard
    .save()
    .then(() => res.json("Board Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").delete((req, res) => {
  Board.findByIdAndDelete(req.params.id)
    .then(() => res.json("Board Delete"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/token/:id").get((req, res) => {
  Board.findOne({
    _id: req.params.id,
  })
    .then((board) => {
      if (board) {
        const info = {
          id: board._id,
          name: board.boardname,
        };
        let tokenBoard = jwt.sign(info, process.env.SECRET_KEY, {
          expiresIn: 1440,
        });
        res.send(tokenBoard);
      }
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
