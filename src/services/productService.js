const productRepository = require('../repositories/productRepository');

const productService = {
  async getAllProducts() {
    return await productRepository.getAllProducts();
  },

  async getProductById(id) {
    return await productRepository.getProductById(id);
  },

  async createProduct(productData) {
    return await productRepository.createProduct(productData);
  },

  async updateProduct(id, productData) {
    return await productRepository.updateProduct(id, productData);
  },

  async deleteProduct(id) {
    return await productRepository.deleteProduct(id);
  },
};

module.exports = productService;
