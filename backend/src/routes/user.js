const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

userRouter.use("/", userAuth);

userRouter.get("/user/pendingRequests", async (req, res) => {
  try {
    const loggedUser = req.user;
    const pendingConnections = await ConnectionRequest.find({
      toUserId: loggedUser._id,
      status: "intrested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    console.log(pendingConnections);
    res.json({ message: "Pending Connections", pendingConnections });
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", async (req, res) => {
  try {
    const loggedUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedUser._id, status: "accepted" },
        { toUserId: loggedUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName age gender skills about")
      .populate("toUserId", "firstName lastName age gender skills about");

    const data = connections.map((row) => {
      if (row.fromUserId.toString() === loggedUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ message: "Connections", data: data });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/feed", async (req, res) => {
  try {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    limit > 50 ? 50 : limit;
    page > 10 ? 10 : page;

    const skip = (page - 1) * 10;
    const loggedUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedUser._id }, { toUserId: loggedUser._id }],
    }).select("fromUserId toUserId");
    //console.log(connections);

    const hideUsersFromFeed = new Set();
    connections.forEach((connection) => {
      hideUsersFromFeed.add(connection.fromUserId.toString());
      hideUsersFromFeed.add(connection.toUserId.toString());
    });
    console.log(hideUsersFromFeed);
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedUser._id } },
      ],
    })
      .select("firstName lastName age about skills")
      .skip(skip)
      .limit(limit);
    console.log(users);
    res.json({ users });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = userRouter;
