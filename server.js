require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productControllers = require("./controllers/productsControllers");
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
app.post("/app/v1/product", productControllers.create);

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
