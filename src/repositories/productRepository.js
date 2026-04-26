const Product = require('../models/Product');

const productRepository = {
  async getAllProducts() {
    return await Product.findAll();
  },

  async getProductById(id) {
    return await Product.findByPk(id);
  },

  async createProduct(productData) {
    return await Product.create(productData);
  },

  async updateProduct(id, productData) {
    const product = await Product.findByPk(id);
    if (product) {
      return await product.update(productData);
    }
    return null;
  },

  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      return true;
    }
    return false;
  },
};

module.exports = productRepository;
