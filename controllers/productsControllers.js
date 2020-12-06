const ProductModel = require("../models/products");
const TransactionModel = require("../models/transaction");
const _ = require("lodash");

const productControllers = {
  createRequest: (req, res) => {
    const existingProduct = req.body.existingProduct;
    const productslug = _.kebabCase(req.body.productname);
    console.log(productslug);
    ProductModel.findOne({
      productname: req.body.productname,
    })
      .then((result) => {
        //productname exists
        console.log(result);
        if (result != null && existingProduct) {
          TransactionModel.create({
            productslug: productslug,
            url: req.body.url,
            qty: req.body.qty,
            price: req.body.price,
            message: req.body.message,
            receipt: req.body.receipt,
            useremail: req.body.useremail,
          })
            //creation is successful
            .then((result) => {
              //201 : Created
              res.statusCode = 201;
              //respond json result back to frontend
              res.json({
                success: true,
                result: result,
                message: "success create transaction for existing product",
              });
            })
            //creation is not successful
            .catch((err) => {
              res.statusCode = 409;
              res.json({
                success: false,
                message: "error in create transaction for existing product",
              });
            });
        }
        //productname not exists
        else if (result == null || !existingProduct) {
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
              TransactionModel.create({
                productslug: productslug,
                url: req.body.url,
                qty: req.body.qty,
                price: req.body.price,
                message: req.body.message,
                receipt: req.body.receipt,
                useremail: req.body.useremail,
              })
                //creation is successful
                .then((result) => {
                  //201 : Created
                  res.statusCode = 201;
                  //respond json result back to frontend
                  res.json({
                    success: true,
                    result: result,
                    message: "success create transaction for new product",
                  });
                })
                //creation is not successful
                .catch((err) => {
                  res.statusCode = 409;
                  res.json({
                    success: false,
                    message: "error in create transaction for new product",
                  });
                });
            })
            //catch error during product model creation
            .catch((err) => {
              res.statusCode = 500;
              res.json({
                success: false,
                message: "error in create new product",
              });
            });
        }
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
    ProductModel.find({ productname: { $regex: keyword } })
      .limit(10)
      .then((result) => {
        if (!result) {
          res.statueCode = 401;
          res.json({
            success: false,
            message: "search result is invalid",
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

  productslist: (req, res) => {
    ProductModel.find().then((results) => {
      res.json(results);
    });
  },

  index: (req, res) => {},
};

module.exports = productControllers;
