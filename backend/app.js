import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Product from './models/product.js'

dotenv.config();
const app = express();

let currentDb, currentDbConnection = false;
const dbPassword = `${process.env.DB_PASSWORD}`;

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

app.use("/api/:dest", async (req, res, next) => {
    const database = req.params.dest == "cart" ? "cart-data" : "products-data";
    const dbURL = `mongodb+srv://admin:${dbPassword}@cluster1.rrag3xw.mongodb.net/${database}?retryWrites=true&w=majority`;

    if (currentDbConnection) {
        await mongoose.disconnect()
            .then(() => {
                console.log(`Disconnected from the ${currentDb} database!`);
            })
            .catch((error) => {
                console.error("Disconnection failed!", error);
            });
    }

    await mongoose.connect(dbURL)
        .then(() => {
            currentDb = database;
            currentDbConnection = true;
            console.log(`Connected to the ${currentDb} database!`);
        })
        .catch(() => {
            console.log(`Connection failed to the ${database} database!`);
        });

    next();
});

app.get("/api/:dest", (req, res, next) => {
    Product.find().then(documents => {
        res.json({
            products: documents,
            message: "Products have been fetched successfully!"
        });
    });
});

app.post("/api/:dest", (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        imageURL: req.body.imageURL
    });

    product.save().then(() => {
        res.json({
            statusId: 201,
            message: "Product has been added successfully!"
        });
    }).catch((error) => {
        res.json({
            statusId: 400,
            message: "An error has occurred!"
        });
    });
});

app.delete("/api/:dest/:id", (req, res, next) => {
    Product.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: "Product has been deleted successfully!"
        });
    });
});

app.put("/api/products/:id", (req, res, next) => {
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