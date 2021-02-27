const mongoose = require("mongoose");
const Product = mongoose.model("Product");

module.exports.addNewProduct = async function (req, res, next) {
  var product = new Product({
    productId: req.body.productId,
    productName: req.body.productName,
    productType: req.body.productType,
    image: req.body.image,
    price: req.body.price,
    stock: req.body.stock,
    outOfStock: req.body.outOfStock,
    description: req.body.description,
    newArrival: req.body.newArrival,
    filters: req.body.filters,
  });
  product.save(function (err, product) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(product.productId);
    }
  });
};

module.exports.getProductsByProductType = async function (req, res, next) {
  const productType = req.body.productType;
  const orderByProductTypeId = { _id: 1 };

  Product.find({ productType: productType })
    .sort(orderByProductTypeId)
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

module.exports.getNewArrivals = async function (req, res, next) {
  Product.find({ newArrival: true })
    .then((result) => {
      if (result) {
        const allnewArrivals = [];
        result.forEach((element) => {
          const newArrivals = {};
          (newArrivals.productId = element.productId),
            (newArrivals.productName = element.productName);
          allnewArrivals.push(newArrivals);
        });
        res.json(allnewArrivals);
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

module.exports.setNewArrivals = async function (req, res, next) {
  const productIdArr = req.body.productIdArr;
  productIdArr.forEach((element) => {
    Product.updateOne(
      { productId: element },
      {
        $set: {
          newArrival: true,
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
  });
};

module.exports.getProductsByProductId = async function (req, res, next) {
  const productId = req.body.productId;

  Product.findOne({ productId: productId })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).send("Required Product not found");
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

module.exports.saveEditedProduct = async function (req, res, next) {
  const productId = req.body.productId;

  Product.updateOne(
    { productId: productId },
    {
      $set: {
        productName: req.body.productName,
        productType: req.body.productType,
        image: req.body.image,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description,
        filters: req.body.filters,
      },
    }
  )
    .then((result) => {
      if (result) {
        res.send({ success: true });
      } else {
        res.status(404).send("Required ProductId is Not_Found");
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

module.exports.setOutofStock = async function (req, res, next) {
  const productIdArray = req.body.productIdArray;
  productIdArray.forEach((element) => {
    Product.updateOne(
      { productId: element },
      {
        $set: {
          outOfStock: true,
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
  });
};

module.exports.getOutofStocks = async function (req, res, next) {
  Product.find({ outOfStock: true })
    .then((result) => {
      if (result) {
        const allOutOfStock = [];
        result.forEach((element) => {
          const outOfStocks = {};
          (outOfStocks.productId = element.productId),
            (outOfStocks.productName = element.productName);
          allOutOfStock.push(outOfStocks);
        });
        res.json(allOutOfStock);
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

module.exports.getStocksByProductType = async function (req, res, next) {
  const productType = req.body.productType;
  const orderByProductTypeId = { _id: 1 };

  Product.find({ productType: productType })
    .sort(orderByProductTypeId)
    .then((result) => {
      if (result) {
        // res.json(result);
        const stocksByProductType = [];
        result.forEach((element) => {
          const stocksbyProType = {};
          (stocksbyProType.productId = element.productId),
            (stocksbyProType.productName = element.productName);
          stocksbyProType.price = element.price;
          stocksbyProType.stock = element.stock;
          stocksbyProType.outOfStock = element.outOfStock;
          stocksByProductType.push(stocksbyProType);
        });
        res.json(stocksByProductType);
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

module.exports.editStockPriceAndStockAmount = async function (req, res, next) {
  const productId = req.body.productId;
  const newPrice = req.body.price;
  const newStock = req.body.stock;

  try {
    const getData = await getproductIdData(productId);
    if (getData == null) {
      console.log("No such Product");
      res.status(404).send("No such Product");
    } else if (!newPrice) {
      console.log("Price can't be null");
      res.status(404).send("Price can't be null");
    } else if (newPrice && newStock > 0) {
      Product.updateOne(
        { productId: productId },
        {
          $set: {
            price: newPrice,
            stock: newStock,
            outOfStock: false,
          },
        }
      )
        .then((result) => {
          if (result) {
            res.send({ success: true });
          } else {
            res.status(404).send("Required ProductId is Not_Found");
          }
        })
        .catch((error) => {
          res.json({ error: error });
          console.log(error);
        });
    } else if (newPrice && (newStock === 0 || newStock == "")) {
      Product.updateOne(
        { productId: productId },
        {
          $set: {
            price: newPrice,
            stock: newStock,
          },
        }
      )
        .then((result) => {
          if (result) {
            res.send({ success: true });
          } else {
            res.status(404).send("Required ProductId is Not_Found");
          }
        })
        .catch((error) => {
          res.json({ error: error });
          console.log(error);
        });
    }
  } catch (e) {
    console.log(e);
  }
};

function getproductIdData(pId) {
  return new Promise(async function (resolve, reject) {
    try {
      Product.findOne({ productId: pId })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } catch (e) {
      reject("Error getting productId data : " + e);
    }
  });
}

module.exports.getLowStocks = async function (req, res, next) {
  Product.find({ stock: { $lt: 10 } })
    .then((result) => {
      if (result) {
        const allLowStocks = [];
        result.forEach((element) => {
          const lowStocks = {};
          (lowStocks.productId = element.productId),
            (lowStocks.productName = element.productName),
            (lowStocks.stock = element.stock);
          allLowStocks.push(lowStocks);
        });
        res.json(allLowStocks);
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

module.exports.addNewBestSeller = async function (req, res, next) {
  Product.updateOne(
    {
      productId: req.body.productId,
      productName: req.body.productName,
      productType: req.body.productType,
    },
    {
      $set: {
        bestSellers: true,
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

module.exports.getBestSellers = async function (req, res, next) {
  Product.find({ bestSellers: true })
    .then((result) => {
      if (result) {
        const allBestSellers = [];
        result.forEach((element) => {
          const bestSellerProducts = {};
          bestSellerProducts.productId = element.productId,
          bestSellerProducts.productName = element.productName,
          bestSellerProducts.productType = element.productType,
          bestSellerProducts.bestSellers = element.bestSellers,
            allBestSellers.push(bestSellerProducts);
        });
        res.json(allBestSellers);
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

module.exports.removeBestSeller = async function (req, res, next) {
  Product.updateOne(
    {
      productId: req.body.productId,
      productName: req.body.productName,
      productType: req.body.productType,
    },
    {
      $set: {
        bestSellers: false,
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