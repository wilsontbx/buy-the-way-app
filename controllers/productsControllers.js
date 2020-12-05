const ProductModel = require("../models/products");

const productControllers = {
  create: (req, res) => {
    console.log(req.body);
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
        res.json({
          success: true,
          message: "The register email is exist",
        });
      })
      .catch((err) => {
        console.log(err);
        res.send("nope");
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
  index: (req, res) => {},
};

module.exports = productControllers;
