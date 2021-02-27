const express = require('express');

const router = express.Router();
const jwtHelper = require('../config/jwtHelper');
const bcrypt = require('bcryptjs');

const ctrlUser = require('../controllers/user.controller.js');
const ctrlAdmin = require('../controllers/admin.controller.js');
const ctrlProduct = require('../controllers/product.controller.js');
const ctrlProductType = require('../controllers/productType.controller.js');
const ctrlOrder = require('../controllers/order.controller.js');
const ctrlCustomer = require('../controllers/customer.controller.js');

//user routes
router.post('/register', ctrlUser.register);
router.post('/adminRegister', ctrlAdmin.adminRegister);
router.post('/authenticate',ctrlAdmin.authenticate);
router.post('/removeAdmin',ctrlAdmin.removeAdmin);
router.post('/editProfile',ctrlAdmin.editProfile);
router.post('/resetPassword',ctrlAdmin.resetPassword);

//product routes
router.post('/addNewProduct',ctrlProduct.addNewProduct);
router.get('/getProductsByProductType', ctrlProduct.getProductsByProductType);
router.get('/getNewArrivals', ctrlProduct.getNewArrivals);
router.post('/setNewArrivals', ctrlProduct.setNewArrivals);
router.get('/getProductsByProductId', ctrlProduct.getProductsByProductId);
router.post('/saveEditedProduct', ctrlProduct.saveEditedProduct);
router.post('/setOutofStock', ctrlProduct.setOutofStock);
router.get('/getOutofStocks', ctrlProduct.getOutofStocks);
router.get('/getStocksByProductType', ctrlProduct.getStocksByProductType);
router.post('/editStockPriceAndStockAmount', ctrlProduct.editStockPriceAndStockAmount);
router.get('/getLowStocks', ctrlProduct.getLowStocks);
router.post('/addNewBestSeller', ctrlProduct.addNewBestSeller);
router.get('/getBestSellers', ctrlProduct.getBestSellers);
router.post('/removeBestSeller', ctrlProduct.removeBestSeller);

//product type routes
router.post('/addNewProductType',ctrlProductType.addNewProductType);
router.get('/getCategoriesByProductType', ctrlProductType.getCategoriesByProductType);

//order routes
router.post('/addNewOrder',ctrlOrder.addNewOrder);
router.get('/getNewOrders', ctrlOrder.getNewOrders);
router.post('/setOrderAsReviewed', ctrlOrder.setOrderAsReviewed);
router.get('/getReviewedOrderList', ctrlOrder.getReviewedOrderList);
router.post('/completeOrder', ctrlOrder.completeOrder);
router.get('/getCompletedOrders', ctrlOrder.getCompletedOrders);
router.post('/cancelOrder', ctrlOrder.cancelOrder);
router.get('/getCanceledOrders', ctrlOrder.getCanceledOrders);

//customer routes
router.post('/addNewCustomer', ctrlCustomer.addNewCustomer);
router.get('/getCustomerById', ctrlCustomer.getCustomerById);

module.exports = router;