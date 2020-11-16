const ProductModel = require("../models/products");
// testing
const productControllers = {
  create: (req, res) => {
    ProductModel.create({
      name: req.body.name,
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
  index: (req, res) => {},
};

module.exports = productControllers;
