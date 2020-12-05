const ProductModel = require("../models/products");
const TransactionModel = require("../models/transaction");

const productControllers = {
  create: (req, res) => {

    console.log(req.body)

    ProductModel.findOne({
      productname: req.body.productname

    })
      .then(result => {
        //productname exists
        if (result != null) {

          TransactionModel.create({
            productname: result.productname,
            url: req.body.url,
            qty: req.body.qty,
            price: req.body.price,
            message: req.body.message,
            receipt: req.body.receipt
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
                receipt: req.body.receipt
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

      })
  },
  index: (req, res) => {},
};

module.exports = productControllers;
