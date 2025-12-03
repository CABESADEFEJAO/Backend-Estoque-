const ProductService = require('../services/ProductService');

class ProductController {
  constructor() {
    this.productService = new ProductService();

    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async list(req, res) {
    try {
      const products = await this.productService.list();
      res.json(products);
    } catch (err) {
      console.error('Erro ao listar produtos:', err.message);
      res.status(500).json({ error: 'Erro ao listar produtos' });
    }
  }

  async create(req, res) {
    const { nome, quantidade } = req.body;
    try {
      const product = await this.productService.create(nome, quantidade);
      res.json(product);
    } catch (err) {
      console.error('Erro ao criar produto:', err.message);
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, quantidade } = req.body;
    try {
      const product = await this.productService.update(id, nome, quantidade);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(product);
    } catch (err) {
      console.error('Erro ao atualizar produto:', err.message);
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    try {
      const deleted = await this.productService.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json({ deleted });
    } catch (err) {
      console.error('Erro ao excluir produto:', err.message);
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  }
}

module.exports = ProductController;
