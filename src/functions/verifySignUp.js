const db = require("../dbmodels");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkBackgroundValid = (req, res, next) => {
  if (req.body.background) {
    var backgroundIndex = parseInt(req.body.background);
    if (!(backgroundIndex >= 1 && backgroundIndex <= 4)) {
      res.status(400).send({
        message: `Background choice not available!`
      });
      return;
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkBackgroundValid
};

module.exports = verifySignUp;
