/* const expenses = require("../models/Expensedb");

exports.newExpense = async (req, res) => {
  const { spentAmount,rows } = req.body;
  const newexpense = new expenses({
    Spentamount:spentAmount,
    Expenses: rows,
  });
  await newexpense.save();
  res.status(200).send("Added");
};
exports.uploadFile = async (req, res) => {

  try {
    const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ filePath }); 
  } catch (error) {
    //console.log(error)
  }
}; */