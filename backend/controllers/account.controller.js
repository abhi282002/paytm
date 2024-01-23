const { mongo, default: mongoose } = require("mongoose");
const Account = require("../model/account.model");

const balanceDetails = async (req, res) => {
  console.log(req.userId);
  const account = await Account.findOne({ userId: req?.userId });
  console.log(account);
  res.status(200).json({ balance: account.balance });
};

const transferAmmount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;
  const account = await Account.findOne({
    userId: req?.userId,
  }).session(session);
  console.log(req.userId);
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }
  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid Account",
    });
  }
  try {
    //perform the transfer
    await Account.updateOne(
      { userId: req?.userId },
      {
        $inc: { balance: -amount },
      }
    );
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });
    await session.commitTransaction();
    res.json({
      message: "Transfer successfull",
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Transaction Failed",
    });
  }
};
module.exports = { balanceDetails, transferAmmount };
