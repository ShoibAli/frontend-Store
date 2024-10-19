const express = require("express");
const userRouter = require("./user");
const { ACrouter } = require("./account");
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", ACrouter);

module.exports = router;
