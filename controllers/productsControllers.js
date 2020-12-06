const PreOrderModel = require("../models/preorders");
const ProductModel = require("../models/products");
const TransactionModel = require("../models/transaction");

const productControllers = {
  createRequest: (req, res) => {
    console.log(req.body);

    ProductModel.findOne({
      productname: req.body.productname,
    }).then((result) => {
      //productname exists
      if (result != null) {
        TransactionModel.create({
          productname: result.productname,
          url: req.body.url,
          qty: req.body.qty,
          price: req.body.price,
          message: req.body.message,
          receipt: req.body.receipt,
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
      }
      //productname not exists
      else if (result == null) {
        ProductModel.create({
          productname: req.body.productname,
          imageurl: req.body.imageurl,
          country: req.body.country,
          foodexpiry: req.body.foodexpiry,
          foodchilled: req.body.foodchilled,
          foodspecial: req.body.foodspecial,
          collectspecial: req.body.collectspecial,
        })

          .then((result) => {
            TransactionModel.create({
              productname: req.body.productname,
              url: req.body.url,
              qty: req.body.qty,
              price: req.body.price,
              message: req.body.message,
              receipt: req.body.receipt,
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
          })
          //catch error during product model creation
          .catch((err) => {
            console.log(err);
            res.send("nope");
          });
      }
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
        res.json({
          success: true,
          result: result,
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
  index: (req, res) => { },

  preOrderCreate: (req, res) => {
    console.log(req.body.productname, req.body)
    PreOrderModel.create({
      productname: req.body.productname,
      imageURL: req.body.imgURL,
      country: req.body.country,
      category: req.body.category,
      foodexpiry: req.body.foodexpiry,
      foodchilled: req.body.foodchilled,
      foodspecial: req.body.foodspecial,
      collectspecial: req.body.collectspecial,
      returndate: req.body.returndate
    })

    // console.log(req.body.productname)
    // res.send(req.body.productname)
  }
};

module.exports = productControllers;
