const expensedb = require("mongoose");
const expensedbschema = new expensedb.Schema({
  Spentamount: {
    required: true,
    type: Number,
  },
  Expenses: {
    required: true,
    type: Array,
  },
});
const expenses = expensedb.model("expenses", expensedbschema);
module.exports = expenses;
