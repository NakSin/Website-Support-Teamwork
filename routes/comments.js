const router = require("express").Router();
let Comment = require("../models/comment.model");

router.route("/:id").get((req, res) => {
  Comment.find({
    taskId: req.params.id,
  })
    .then((commentList) => {
      res.json(commentList);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/").post((req, res) => {
  const taskId = req.body.taskId;
  const author = req.body.author;
  const content = req.body.content;
  const userId = req.body.userId;
  const newComment = new Comment({
    taskId,
    author,
    content,
    userId,
  });
  newComment
    .save()
    .then(() => res.json("Comment Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/edit/:id").post((req, res) => {
  Comment.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        content: req.body.newContent,
      },
    },
    function (err, num) {}
  )
    .then(() => res.json("Comment edit new content"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/delete/:id").post((req, res) => {
  Comment.deleteOne({
    _id: req.params.id,
  })
    .then(() => res.json("Comment delete"))
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
