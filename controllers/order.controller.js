const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const emailController = require('./email.controller');
// let date_ob = new Date();
// let date = ("0" + date_ob.getDate()).slice(-2);
// let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// let year = date_ob.getFullYear();
// let hours = date_ob.getHours();
// let minutes = date_ob.getMinutes();
// let seconds = date_ob.getSeconds();
// var currentdate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
const moment = require('moment-timezone');
const currentdate = moment().tz("Asia/Colombo").format("YYYY-MM-DD h:mm:ss a");
module.exports.addNewOrder = async function (req, res, next) {
  var order = new Order({
    orderId: req.body.orderId,
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    orderItems: req.body.orderItems,
    state: "Not_Reviewed",
    dateOfOrder: currentdate,
  });
  order.save(function (err, product) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(product.orderId);
    }
  });
};

module.exports.getNewOrders = async function (req, res, next) {
  const orderBydateOfOrder = { dateOfOrder: 1 };

  Order.find({ state: "Not_Reviewed" })
    .sort(orderBydateOfOrder)
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

module.exports.setOrderAsReviewed = async function (req, res, next) {
  Order.updateOne(
    { orderId: req.body.orderId, customerName: req.body.customerName },
    {
      $set: {
        state: "Reviewed",
        reviewedBy: req.body.reviewedBy,
        reviewdDate: currentdate,
      },
    }
  )
    .then((result) => {
      if (result) {
        res.send({ success: true });
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

module.exports.getReviewedOrderList = async function (req, res, next) {
  Order.find({ state: "Reviewed" })
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

module.exports.completeOrder = async function (req, res, next) {
  Order.updateOne(
    { orderId: req.body.orderId, 
      customerName: req.body.customerName,
      orderItems: req.body.orderItems,
      dateOfOrder: req.body.dateOfOrder
      },
    {
      $set: {
        state: "Completed",
        completedBy: req.body.completedBy,
        completedDate: currentdate,
      },
    }
  )
    .then((result) => {
      if (result) {
        res.send({ success: true });
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

module.exports.getCompletedOrders = async function (req, res, next) {
  Order.find({ state: "Completed" })
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

module.exports.cancelOrder = async function (req, res, next) {
  // Required for the cancelled oreder email sending part
  const email = req.body.userEmail;
  console.log(currentdate);
  Order.updateOne(
    { orderId: req.body.orderId, 
      customerName: req.body.customerName,
      orderItems: req.body.orderItems,
      dateOfOrder: req.body.dateOfOrder
      },
    {
      $set: {
        state: "Cancelled",
        cancledDate: currentdate,
      },
    }
  )
    .then(async(result) => {
      if (result) {
        res.send({ success: true });
        await sendOrderCancelledEmail(email);
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

function sendOrderCancelledEmail(receiverEmail) {
  return new Promise(async function (resolve, reject) {
    try {
      if (!receiverEmail) {
        reject("Email Null.");
    } else {
        const userEmail = receiverEmail;
        const htmlBody = '<h1> Welcome, </h1><p> Requesting Order has been cancelled by Sigen.ik. Please contact the branch. </p>';
        emailController.sendemail(userEmail, htmlBody);
        resolve("Sent Cancelled Order Email Successfully.");
    }

    } catch (e) {
      reject("Error getting user email : " + e);
    }
  });
};

module.exports.getCanceledOrders = async function (req, res, next) {
  Order.find({ state: "Cancelled" })
    .then((result) => {
      if (result) {
        const allCancelledOrders = [];
        result.forEach((element) => {
          const canceledOrders = {};
          canceledOrders.orderId = element.orderId,
          canceledOrders.customerName = element.customerName;
          canceledOrders.state = element.state;
          canceledOrders.orderItems = element.orderItems;
          canceledOrders.dateOfOrder = element.dateOfOrder;
            allCancelledOrders.push(canceledOrders);
        });
        res.json(allCancelledOrders);
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

