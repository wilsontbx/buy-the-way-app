const ProductModel = require("../models/products");
// testing
const productControllers = {
  create: (req, res) => {
    console.log(req.body)

    ProductModel.findOne({
      productname: req.body.productname

    })
      .then(result => {
        if (result != null) {

          ProductModel.updateOne({
            productname: result.productname
          },
            {
              $addToSet: {
                transaction: {
                  url: req.body.url,
                  qty: req.body.qty,
                  price: req.body.price,
                  message: req.body.message,
                  receipt: req.body.receipt
                }
              }
            },
            { upsert: false })
            .then((result) => {
              res.statusCode = 201;
              res.json(result);
            })
            .catch((err) => {
              console.log(err);
              res.send("nope");
            });
        }
        else if (result == null) {

          ProductModel.create({
            productname: req.body.productname,
            imageurl: req.body.imageurl,
            country: req.body.country,
            foodexpiry: req.body.foodexpiry,
            foodchilled: req.body.foodchilled,
            foodspecial: req.body.foodspecial,
            collectspecial: req.body.collectspecial,
            transaction: {
              url: req.body.url,
              qty: req.body.qty,
              price: req.body.price,
              message: req.body.message,
              receipt: req.body.receipt
            }
          })
            .then((result) => {
              res.statusCode = 201;
              res.json(result);
            })
            .catch((err) => {
              console.log(err);
              res.send("nope");
            });
        }
      })


    // ProductModel.create({
    //     productname: req.body.productname,
    //     imageurl: req.body.imageurl,
    //     country: req.body.country,
    //     foodexpiry: req.body.foodexpiry,
    //     foodchilled: req.body.foodchilled,
    //     foodspecial: req.body.foodspecial,
    //     collectspecial: req.body.collectspecial,
    //   })
    //       .then((result) => {
    //         res.statusCode = 201;
    //         res.json(result);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         res.send("nope");
    //       });
  },
  index: (req, res) => { },
};

module.exports = productControllers;
