const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  orderItems: {
    type: Array,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  dateOfOrder: {
    type: Date,
    required: true,
  },
  reviewedBy: {
    type: String,
  },
  reviewdDate: {
    type: Date,
  },
  completedBy: {
    type: String,
  },
  completedDate: {
    type: Date,
  },
  cancledDate: {
    type: Date,
  },
  
});

// orderSchema.index({partialFilterExpression: {state: { $eq: "Cancelled" }}, expireAfterSeconds: 2592000});
mongoose.model("Order", orderSchema);
module.exports = orderSchema;
