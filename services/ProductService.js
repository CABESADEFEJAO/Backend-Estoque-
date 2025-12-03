const ProductRepository = require('../repositories/ProductRepository');

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async list() {
    return this.productRepository.findAll();
  }

  async create(nome, quantidade) {
    if (!nome || quantidade == null) {
      const error = new Error('Nome e quantidade são obrigatórios');
      error.statusCode = 400;
      throw error;
    }
    return this.productRepository.create(nome, quantidade);
  }

  async update(id, nome, quantidade) {
    if (!id) {
      const error = new Error('ID é obrigatório');
      error.statusCode = 400;
      throw error;
    }
    return this.productRepository.update(id, nome, quantidade);
  }

  async delete(id) {
    if (!id) {
      const error = new Error('ID é obrigatório');
      error.statusCode = 400;
      throw error;
    }
    return this.productRepository.delete(id);
  }
}

module.exports = ProductService;
