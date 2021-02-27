const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true,
    },
    productName:{
        type:String,
        required:true,
    },
    productType:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    outOfStock:{
        type:Boolean,
        required:true,
    }, 
    description:{
        type:String,
        required:true,
    },
    bestSellers: {
        type: Boolean,
    },
    newArrival: {
        type: Boolean,
    },
    filters: [{
        category: { type: String},
        selectedFilters: {type: Array}
    }],
});

mongoose.model('Product', productSchema);
module.exports = productSchema;
