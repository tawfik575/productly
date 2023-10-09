import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Product from './models/product.js'

const app = express();
const dbPassword = "KBAxFw7fGQdk56Zd";

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

app.use("/api/admin/products", (req, res, next) => {
    const collection = "products-data";
    const dbURL = `mongodb+srv://admin:${dbPassword}@cluster1.rrag3xw.mongodb.net/${collection}?retryWrites=true&w=majority`;

    mongoose.connect(dbURL)
        .then(() => {
            console.log("Connected to the database!");
        })
        .catch(() => {
            console.log("Connection failed!");
        });

    next();
});

app.get("/api/admin/products", (req, res, next) => {
    Product.find().then(documents => {
        res.json({
            products: documents,
            message: "Products have been fetched successfully!"
        });
    });
});

app.post("/api/admin/products", (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        imageURL: req.body.imageURL
    });

    product.save().then(productData => {
        res.status(201).json({
            productId: productData._id,
            message: "Product has been added successfully!"
        });
    });
});

app.delete("/api/admin/products/:id", (req, res, next) => {
    Product.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: "Product has been deleted successfully!"
        });
    });
});

app.put("/api/admin/products/:id", (req, res, next) => {
    const product = new Product({
        _id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        imageURL: req.body.imageURL
    });

    Product.updateOne({ _id: req.params.id }, product).then(() => {
        res.status(200).json({
            message: "Product has been updated successfully!"
        });
    });
});

export default app;