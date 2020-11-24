const mongoose = require("mongoose");

const UserSetting = mongoose.model(
  "UserSetting",
  new mongoose.Schema({
    username: String,
    background: String
  })
);

module.exports = UserSetting;
