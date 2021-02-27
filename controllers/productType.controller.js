const mongoose = require("mongoose");
const ProductType = mongoose.model("ProductType");

module.exports.addNewProductType = async function (req, res, next) {
    var productType = new ProductType({
    productTypeId : req.body.productTypeId,
    productTypeName : req.body.productTypeName,
    filters : req.body.filters,
    });
    productType.save(function(err,productType){
        if(err){
            console.log(err.message);
            res.status(400).json(err);
        }
        else{
            res.status(200).json(productType.productTypeId);
        }
    });
};

module.exports.getCategoriesByProductType = async function (req, res, next) {
    const productTypeName = req.body.productTypeName;
    const orderByCategoryId = { _id: 1 };

    ProductType.findOne(productTypeName).sort(orderByCategoryId)
    .then(result => {
        if (result) {
            res.json(result.filters);
        }
    })
    .catch(error => {
        res.json({ error: error });
        console.log(error);
    });
}