const invoice = require("../models/Invoicedb");
exports.newInvoice = async (req, res) => {
  const {
    clientname,
    clientaddress,
    clientemail,
    totalRate,
    phone,
    rows,
    istTimestamp,
  } = req.body;

  const existinguser = await invoice.findOne({ Email: clientemail }, { id: 1 });
  if (existinguser !== null) {
    res.status(409).send("User Already Exists");
  } else {
    const newuser = new invoice({
      clientname,
      clientaddress,
      clientemail,
      totalRate,
      phone,
      Itemspurchased: rows,
      issuedon: istTimestamp,
    });
    await newuser.save();
    res.send("User Details Added");
  }
};
