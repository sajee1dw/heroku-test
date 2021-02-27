const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

module.exports.addNewCustomer = async function (req, res, next) {
  var customer = new Customer({
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    address: req.body.address,
    email: req.body.email,
    mobile: req.body.mobile,
  });
  customer.save(function (err, customer) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(customer.customerId);
    }
  });
};

module.exports.getCustomerById = async function (req, res, next) {
    const customerId = req.body.customerId;
  
    Customer.find({ customerId: customerId })
      .then((result) => {
        if (result) {
          res.json(result);
        }
      })
      .catch((error) => {
        res.json({ error: error });
        console.log(error);
      });
  };