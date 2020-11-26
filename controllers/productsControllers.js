const ProductModel = require("../models/products");
// testing
const productControllers = {
  create: (req, res) => {
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
        res.statusCode = 201;
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.send("nope");
      });
  },
  index: (req, res) => { },
};

module.exports = productControllers;
