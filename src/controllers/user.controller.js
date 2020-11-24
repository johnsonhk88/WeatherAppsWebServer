const db = require("../dbmodels");
const User = db.user;
const UserSetting = db.usersetting;

exports.normalPage = (req, res) => {
  res.status(200).send("Normal Page");
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

