const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productSchema = require('./models/product.js');

dotenv.config();
const app = express();

let dbModel;
const dbUser = `${process.env.DB_USER}`;
const dbPassword = `${process.env.DB_PASSWORD}`;

const cartDB = mongoose.createConnection(`mongodb+srv://${dbUser}:${dbPassword}@cluster1.rrag3xw.mongodb.net/cart-data?retryWrites=true&w=majority`);
const productsDB = mongoose.createConnection(`mongodb+srv://${dbUser}:${dbPassword}@cluster1.rrag3xw.mongodb.net/products-data?retryWrites=true&w=majority`);
const Cart = cartDB.model("products", productSchema);
const Product = productsDB.model("products", productSchema)

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use("/api/:dest", (req, res, next) => {
    dbModel = req.params.dest == "cart" ? Cart : Product;
    next();
});

app.get("/api/:dest", (req, res, next) => {
    dbModel.find().then(documents => {
        res.json({
            products: documents,
            message: "Products have been fetched successfully!"
        });
    });
});

app.post("/api/:dest", (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        imageURL: req.body.imageURL
    };

    dbModel.create(product).then(() => {
        res.json({
            statusId: 201,
            message: "Product has been added successfully!"
        });
    }).catch((error) => {
        console.log(error)
        res.json({
            statusId: 400,
            message: "An error has occurred!"
        });
    });
});

app.delete("/api/:dest/:id", async(req, res, next) => {
    await dbModel.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: "Product has been deleted successfully!"
        });
    });
});

app.put("/api/products/:id", (req, res, next) => {
    const product = {
        _id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        imageURL: req.body.imageURL
    };

    dbModel.updateOne({ _id: req.params.id }, product).then(() => {
        res.status(200).json({
            message: "Product has been updated successfully!"
        });
    });
});

module.exports = app;