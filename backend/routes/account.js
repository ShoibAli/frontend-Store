const express = require("express");
const { Account, User } = require("../db");
const { autoMiddleware } = require("../middleware");
const { mongoose } = require("mongoose");
const ACrouter = express.Router();

ACrouter.get("/balance", autoMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userID: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});

ACrouter.post("/transfer", autoMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;
  const account = await Account.findOne({
    userID: req.userId,
  }).session(session);
  console.log(account.balance);
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "insufficent balance",
    });
  }
  const toAccont = await Account.find({
    userID: to,
  }).session(session);
  if (!toAccont) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "invalid account",
    });
  }

  await Account.updateOne(
    {
      userID: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);
  console.log(toAccont);
  await Account.updateOne(
    {
      userID: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);
  await session.commitTransaction();
  console.log(account.balance);
  res.json({
    message: "Transfer Successfull",
  });
});

module.exports = { ACrouter };
