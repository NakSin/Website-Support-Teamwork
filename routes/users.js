const router = require("express").Router();
let User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

process.env.SECRET_KEY = "secret";

router.route("/signup").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const message = [
    {
      title: "Thanks You",
      content: "Welcome to my website",
    },
  ];
  const newUser = new User({ name, email, password, message });
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        if (req.body.password != req.body.email) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            newUser.password = hash;
            User.create(newUser)
              .then((user) => {
                res.json({ status: user.email + "Sign Up" });
              })
              .catch((err) => {
                res.json("error: " + err);
              });
          });
        } else {
          res.json({ error: "Passwork not be same Email" });
        }
      } else {
        res.json({ error: "Email already use" });
      }
    })
    .catch((err) => {
      res.json("error: " + err);
    });
});

router.route("/signin").post((req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const info = {
            id: user._id,
            name: user.name,
            email: user.email,
          };
          let token = jwt.sign(info, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          res.json({ error: "Email or Password not correct" });
        }
      } else {
        res.json({ error: "Email or Password not correct" });
      }
    })
    .catch((err) => {
      res.json("error: " + err);
    });
});

module.exports = router;
