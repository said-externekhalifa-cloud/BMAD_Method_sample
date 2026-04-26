const productService = require('../services/productService');

const productController = {
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Produit non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createProduct(req, res) {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message }); // 400 for bad request (e.g., validation errors)
    }
  },

  async updateProduct(req, res) {
    try {
      const updatedProduct = await productService.updateProduct(req.params.id, req.body);
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ message: 'Produit non trouvé' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const success = await productService.deleteProduct(req.params.id);
      if (success) {
        res.status(204).send(); // 204 No Content for successful deletion
      } else {
        res.status(404).json({ message: 'Produit non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productController;
