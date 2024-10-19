const express = require("express");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const z = require("zod");
const { JWT_SECRET } = require("../config");
const { autoMiddleware } = require("../middleware");

const userRouter = express.Router();

const stringValid = z.string();

userRouter.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  if (
    stringValid.safeParse(username).success &&
    stringValid.safeParse(password).success &&
    stringValid.safeParse(firstname).success &&
    stringValid.safeParse(lastname).success
  ) {
    const user1 = await User.findOne({
      username: req.body.username,
    });
    if (user1) {
      return res.json({
        message: "Email already taken / Incorrect inputs",
      });
    }
    const user = await new User({
      username,
      password,
      firstname,
      lastname,
    });
    const DBuser = await user.save();
    const userId = DBuser._id;
    ///create a account
    await Account.create({
      userID: userId,
      balance: 1 + Math.random() * 1000,
    });
    const token = jwt.sign(
      {
        userId: DBuser._id,
      },
      JWT_SECRET
    );
    return res.json({
      message: "User created successfully",
      token,
    });
  } else {
    res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }
});

const ObjSchema = z.object({
  password: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

userRouter.put("/", autoMiddleware, async (req, res) => {
  const { success } = ObjSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );
  res.json({
    message: "Updated successfully",
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

userRouter.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const response = await User.findOne({
    username,
    password,
  });
  console.log(username);
  console.log(password);
  if (!response) {
    return res.json({
      error: "wrong credentials",
    });
  }
  res.json({
    msg: "sign in completed",
  });
});

module.exports = userRouter;
