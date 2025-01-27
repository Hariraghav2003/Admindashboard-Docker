const invoicedb = require("mongoose");
//User Schema
const invoiceschema = new invoicedb.Schema({
  clientname: {
    required: true,
    type: String,
  },
  clientaddress: {
    required: true,
    type: String,
  },
  clientemail: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  totalRate: {
    required: true,
    type: Number,
  },
  Itemspurchased: {
    required: true,
    type: Array,
  },
  issuedon: {
    required: true,
    type: String,
  },
});

//Invoice Model
const invoice = invoicedb.model("invoice", invoiceschema);
module.exports = invoice;
