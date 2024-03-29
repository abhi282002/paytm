const User = require("../model/user.model");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_token = require("../config");
const Account = require("../model/account.model");
const singupSchema = zod.object({
  username: zod.string().email(),
  lastName: zod.string(),
  firstName: zod.string(),
  password: zod.string(),
});
const signUp = async (req, res) => {
  const { firstName, lastName, password, username } = req.body;
  const { success } = singupSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Invalid Inputs",
    });
  }

  const user = await User.findOne({ username: username });
  if (user?._id) {
    return res.status(403).json({ message: "User already present" });
  }
  const dbUser = await User.create({
    username,
    firstName,
    lastName,
    password,
  });

  await Account.create({
    userId: dbUser?._id,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_token
  );

  res.status(200).json({ message: "User created Successfully", token: token });
};
const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
const signIn = async (req, res) => {
  const { username, password } = req.body;
  const { success } = zod.safeParse(req.body);
  if (!success) {
    return res.status(403).json({ message: "Invalid Inputs" });
  }
  const user = await User.findOne({ username: username, password: password });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }
  res.status(500).json({ message: "Error while logging Please try again" });
};

const updateSchema = zod.object({
  username: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
const updateUser = async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({ message: "Please send valid inputs" });
  }
  await User.updateOne(
    { _id: req.userId },
    {
      $set: req.body,
    }
  );
  res.status(200).json({ message: "User Details Update Successfully" });
};

const filterLogic = async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });
  res.status(200).json({
    user: users.map((user) => {
      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      };
    }),
  });
};
module.exports = {
  signUp,
  updateUser,
  filterLogic,
  signIn,
};
