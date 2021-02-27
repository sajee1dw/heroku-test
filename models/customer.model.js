const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customerId: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
});

mongoose.model("Customer", customerSchema);
module.exports = customerSchema;
