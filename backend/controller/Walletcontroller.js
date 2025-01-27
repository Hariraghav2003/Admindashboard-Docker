/* const wallet = require("../models/Walletdb");

exports.Walletamountupdation = async (req, res) => {
  const { walletAmount, Date } = req.body;
  const newwalletamount = new wallet({
    walletAmount,
    Date,
  });
  await newwalletamount.save();
  res.status(200).send("Added");
};

exports.walletAmount = async (req, res) => {
  try {
    const walletAmount = await wallet.findOne().sort({ Date: -1 });
    res.json(walletAmount);
  } catch (error) {
    //console.log(error);
  }
}; */ 
