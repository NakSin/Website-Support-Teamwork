const router = require("express").Router();
let User = require("../models/user.model");
let Board = require("../models/board.model");

router.route("/:id").get((req, res) => {
  Board.find(
    {
      _id: req.params.id,
    },
    { usersjoin: 1 }
  ).then((member) => {
    const memberId = [];
    for (var i = 0; i < member[0].usersjoin.length; i++) {
      memberId.push(member[0].usersjoin[i]._id);
    }
    User.find({
      _id: { $in: memberId },
    }).then((user) => {
      const infoMember = [];
      for (var i = 0; i < user.length; i++) {
        for (var j = 0; j < user.length; j++) {
          if (user[j]._id == memberId[i]) {
            user.push(user[j]);
            user.splice(j, 1);
          }
        }
      }
      for (var i = 0; i < user.length; i++) {
        infoMember.push({
          id: user[i]._id,
          name: user[i].name,
          email: user[i].email,
          role: member[0].usersjoin[i].role,
          datejoin: member[0].usersjoin[i].datejoin,
        });
      }
      res.send(infoMember);
    });
  });
});

router.route("/remove").post((req, res) => {
  Board.updateOne(
    { _id: req.body.boardId },
    {
      $pull: {
        usersjoin: { _id: req.body.id, role: "Member" },
      },
    },
    function (err, num) {}
  );
});

router.route("/add").post((req, res) => {
  const date = new Date();
  User.findOne({
    email: req.body.email,
  }).then((member) => {
    Board.updateOne(
      {
        _id: req.body.boardId,
        "usersjoin._id": { $exists: true, $ne: member._id },
      },
      {
        $addToSet: {
          usersjoin: {
            $each: [
              {
                _id: member._id,
                role: "Member",
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
            ],
          },
        },
      },
      function (err, num) {}
    )
      .then(() => res.json("Add New Member Done"))
      .catch((err) => res.status(400).json("Error" + err));
  });
});

module.exports = router;
