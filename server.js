const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/productdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("DB connection established"))
    .catch(err => console.log("Failed to connect to the database"));

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
        minlength: [2, "Title must be at least 2 characters."],
        maxlength: [100, "Server space isn't free!"]
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
        min: [1, "Price must be at least $1."]
    },
    description: {
        type: String,
        required: [true, "Description is required."],
        minlength: [10, "Description must be at least 10 characters."]
    }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

app.get("/api/products/all", (req, res) => {
    Product.find({})
        .then(data => res.json({ message: "success", results: data }))
        .catch(err => res.json({ message: "error", results: err }));
});

app.get("/api/products/:id", (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(data => res.json({ message: "success", results: data }))
        .catch(err => res.json({ message: "error", results: err }));
});

app.post("/api/products", (req, res) => {
    Product.create(req.body)
        .then(data => res.json({ message: "success", results: data }))
        .catch(err => res.json({ message: "error", results: err }));
});

app.put("/api/products/:id", (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, {runValidators: true, new: true })
        .then(data => res.json({ message: "success", results: data }))
        .catch(err => res.json({ message: "error", results: err }));
});
    

app.delete("/api/products/:id", (req, res) => {
    Product.findOneAndDelete({ _id: req.params.id })
        .then(data => res.json({ message: "success", results: data }))
        .catch(err => res.json({ message: "error", results: err}));
});


app.listen(port, () => console.log(`Listening on port: ${port}`) );