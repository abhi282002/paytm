const User = require("../model/user.model");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_token = require("../config");
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
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_token
  );

  res.status(200).json({ message: "User created Successfully", token: token });
};

module.exports = signUp;
