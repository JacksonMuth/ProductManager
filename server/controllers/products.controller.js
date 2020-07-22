const Product = require("../models/products");

module.exports.allProducts = (req, res) => {
    Product.find({})
        .then(data => res.json({ message: "success", results: data }))
        .catch(err => res.json({ message: "error", results: err }));
};

module.exports.oneProduct = (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(data => res.json({ message: "success", results: data }))
        .catch(err => res.json({ message: "error", results: err }));
};

module.exports.createProduct = (req, res) => {
    Product.create(req.body)
        .then(data => res.json({ message: "success", results: data }))
        .catch(err => res.json({ message: "error", results: err }));
};

module.exports.editProduct = (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, {runValidators: true, new: true })
        .then(data => res.json({ message: "success", results: data }))
        .catch(err => res.json({ message: "error", results: err }));
};

module.exports.deleteProduct = (req, res) => {
    Product.findOneAndDelete({ _id: req.params.id })
        .then(data => res.json({ message: "success", results: data }))
        .catch(err => res.json({ message: "error", results: err}));
};
