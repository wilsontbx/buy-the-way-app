require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const productsControllers = require("./controllers/productsControllers");
const usersControllers = require("./controllers/usersControllers");
const app = express();
const port = process.env.PORT;

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.set("useFindAndModify", false);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
  })
);
app.options("*", cors());

//ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to buy-the-way api");
});
app.post(
  "/api/v1/products/request/create",
  verifyJWT,
  productsControllers.createRequest
);

app.post("/api/v1/products/search", productsControllers.search);
app.get("/api/v1/products/list", productsControllers.productslist);

//USER ROUTES
app.post("/api/v1/users/register", usersControllers.register);
app.post("/api/v1/users/login", usersControllers.login);
app.post("/api/v1/users/dashboard", usersControllers.dashboard);
app.post("/api/v1/users/getuserinfo", verifyJWT, usersControllers.getUserInfo);
app.post("/api/v1/products/preorder/create", productsControllers.preOrderCreate)
app.post("/api/v1/users/update", verifyJWT, usersControllers.updateUserInfo)

function verifyJWT(req, res, next) {
  // get the jwt token from the request header
  const authToken = req.headers.auth_token;
  // check if authToken header value is empty, return err if empty
  if (!authToken) {
    res.json({
      success: false,
      message: "Auth header value is missing",
    });
    return;
  }

  // verify that JWT is valid and not expired
  try {
    // if verify success, proceed
    const userData = jwt.verify(authToken, process.env.JWT_SECRET);
    next();
  } catch (err) {
    // if fail, return error msg
    res.json({
      success: false,
      message: "Auth token is invalid",
    });
    return;
  }
}

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => {
    console.log("DB connection successful");

    app.listen(port, () => {
      console.log(`Buy The Way app listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
