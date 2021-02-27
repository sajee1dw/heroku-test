const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
    productTypeName:{
        type: String,
        required: true,
        unique: true,
    },
    productTypeId:{
        type: String,
        required: true,
        unique: true,
    },
    // category:[{
    //     type: Array,
    //     required: true,
    // }],
    filters: [{
        category: { type: String},
        selectedFilters: {type: Array}
    }],
});

mongoose.model('ProductType', productTypeSchema);
module.exports = productTypeSchema;
