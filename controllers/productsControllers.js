const PreOrderModel = require("../models/preorders");
const ProductModel = require("../models/products");
const TransactionModel = require("../models/transaction");
const _ = require("lodash");

const productControllers = {
  createRequest: (req, res) => {
    const existingProduct = req.body.existingProduct;
    const productslug = _.kebabCase(req.body.productname);
    ProductModel.findOne({
      productname: req.body.productname,
    })
      .then((result) => {
        TransactionModel.create({
          productslug: productslug,
          url: req.body.url,
          qty: req.body.qty,
          price: req.body.price,
          message: req.body.message,
          receipt: req.body.receipt,
          useremail: req.body.useremail,
          statusopen: true,
        })
          .then((resultTransaction) => {
            if (result != null && existingProduct) {
              res.statusCode = 201;
              res.json({
                success: true,
                result: resultTransaction,
                message: "success create transaction for existing product",
              });
            } else if (result == null || !existingProduct) {
              ProductModel.create({
                productname: req.body.productname,
                productslug: productslug,
                imageUrl: req.body.imageUrl,
                country: req.body.country,
                category: req.body.category,
                foodexpiry: req.body.foodexpiry,
                foodchilled: req.body.foodchilled,
                foodspecial: req.body.foodspecial,
                collectspecial: req.body.collectspecial,
              })
                .then((result) => {
                  res.statusCode = 201;
                  res.json({
                    success: true,
                    result: result,
                    message: "success create new product and transaction",
                  });
                })
                .catch((err) => {
                  res.statusCode = 409;
                  res.json({
                    success: false,
                    message: "error in create new product and transaction",
                  });
                });
            }
          })
          .catch((err) => {
            res.statusCode = 500;
            res.json({
              success: false,
              message: "error create transaction",
            });
          });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({
          success: false,
          message: "error occur search product name",
        });
      });
  },

  search: (req, res) => {
    const keyword = req.body.keyword;
    ProductModel.find({ productname: { $regex: keyword, $options: "i" } })
      .limit(10)
      .then((result) => {
        if (!result) {
          res.statueCode = 401;
          res.json({
            success: false,
            message: "search result is empty",
          });
          return;
        }
        res.statusCode = 200;
        res.json({
          success: true,
          result: result,
          message: "search is successful",
        });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({
          success: false,
          message: "something wrong in search function",
        });
      });
  },
  preOrderCreate: (req, res) => {
    console.log(req.body);
    PreOrderModel.create({
      productname: req.body.productname,
      imageURL: req.body.imgURL,
      country: req.body.country,
      category: req.body.category,
      foodexpiry: req.body.foodexpiry,
      foodchilled: req.body.foodchilled,
      foodspecial: req.body.foodspecial,
      collectspecial: req.body.collectspecial,
      returndate: req.body.returndate,
      email: req.body.email,
    })
      //creation is successful
      .then((result) => {
        //201 : Created
        res.statusCode = 201;
        //respond json result back to frontend
        res.json(result);
      })
      //creation is not successful
      .catch((err) => {
        res.statusCode = 409;
        console.log(err);
        res.send("Error occurs during creation");
      });
  },
  productslist: (req, res) => {
    ProductModel.find()
      .limit(8)
      .then((results) => {
        res.json(results);
      });
  },
  getProductBySlug: (req, res) => {
    const slug = req.params.slug;
    ProductModel.findOne({
      productslug: slug,
    })
      .then((productDetails) => {
        if (!productDetails) {
          res.statueCode = 401;
          res.json({
            success: false,
            message: "This product not exist",
          });
          return;
        }
        TransactionModel.find({
          productslug: slug,
        })
          .sort({ updated_at: "desc" })
          .then((transactionDetails) => {
            if (!transactionDetails) {
              res.statueCode = 401;
              res.json({
                success: false,
                message: "This transaction not exist",
              });
              return;
            }

            res.statusCode = 200;
            res.json({
              success: true,
              message: "Product and Transaction found",
              product: productDetails,
              transaction: transactionDetails,
            });
          })
          .catch((err) => {
            res.statusCode = 409;
            res.json({
              success: false,
              message: "Transaction not found",
            });
          });
      })
      .catch((err) => {
        res.statusCode = 409;
        res.json({
          success: false,
          message: "Product not found",
        });
      });
  },
};

module.exports = productControllers;
