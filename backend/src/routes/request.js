const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestsRouter = express.Router();

requestsRouter.use("/request", userAuth);

requestsRouter.post("/request/send/:status/:toUserId", async (req, res) => {
  try {
    const validStatus = ["ignored", "intrested"];
    const isValidStatus = validStatus.includes(req.params.status);
    if (!isValidStatus) {
      return res.status(400).send("Invalid status sent!");
    }
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const validToUserId = await User.findById(toUserId);
    if (!validToUserId) {
      return res.status(400).send("User not present!");
    }
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).send("Connection already sent!");
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    res.json({
      message: `${req.user.firstName} is ${status} in ${validToUserId.firstName}`,
      data,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

requestsRouter.post("/request/review/:status/:requestId", async (req, res) => {
  try {
    const { status, requestId } = req.params;
    const loggedUser = req.user;
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).send("Invalid status");
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedUser._id,
      status: "intrested",
    });

    if (!connectionRequest) {
      return res.status(400).send("Connection request not found!");
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.json({ message: "status updated succesfully", data });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = requestsRouter;
