const db = require("../dbmodels");
const User = db.user;
const UserSetting = db.usersetting;

exports.changeTheme = (req, res) => {
   User.findById(req.userId)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      UserSetting.findOneAndUpdate({username: user.username},{background: req.query.background},{useFindAndModify: false})
        .exec((err, usersetting) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!usersetting) {
            return res.status(404).send({ message: "UserSetting Not found." });
          }

          res.status(200).send({
            username: user.username,
            background: req.query.background
          });
        });

    });
};

exports.loginedPage = (req, res) => {
   User.findById(req.userId)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      UserSetting.findOne({
        username: user.username
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
            username: user.username,
            email: user.email,
            background: usersetting.background
          });
        });

    });
};

