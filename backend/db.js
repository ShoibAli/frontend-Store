const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shoibalibhai:xtHyQAchIymwfmvU@cluster0.phiqsn3.mongodb.net/paytm-DB"
);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

const BankSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", BankSchema);

module.exports = {
  User,
  Account,
};
