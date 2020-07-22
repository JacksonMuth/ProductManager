const controller = require("../controllers/products.controller");

module.exports = function(app) {
    app.get("/api/products/all", controller.allProducts);
    
    app.get("/api/products/:id", controller.oneProduct);

    app.post("/api/products", controller.createProduct);

    app.put("/api/products/:id", controller.editProduct);
        
    app.delete("/api/products/:id", controller.deleteProduct);
}

