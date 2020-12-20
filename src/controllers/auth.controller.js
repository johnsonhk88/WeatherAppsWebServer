const config = require("../config/auth.config");
const db = require("../dbmodels");
const User = db.user;
const UserSetting = db.usersetting;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });

  const usersetting = new UserSetting({
    username: req.body.username,
    background: "1"
  });

  if (req.body.background) {
    usersetting.background = req.body.background;
  }

  usersetting.save((err, usersetting) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });

  res.send({ message: "User was registered successfully!" });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      UserSetting.findOne({
        username: req.body.username
      })
        .exec((err, usersetting) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!usersetting) {
            return res.status(404).send({ message: "UserSetting Not found." });
          }

          res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            background: usersetting.background,
            accessToken: token
          });
        });

    });
};
