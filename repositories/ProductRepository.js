const db = require('../db');
const Product = require('../models/Product');

class ProductRepository {
  async findAll() {
    const { rows } = await db.query('SELECT id, nome, quantidade FROM produtos ORDER BY id');
    return rows.map(r => new Product(r));
  }

  async create(nome, quantidade) {
    const { rows } = await db.query(
      'INSERT INTO produtos (nome, quantidade) VALUES ($1, $2) RETURNING id, nome, quantidade',
      [nome, quantidade]
    );
    return new Product(rows[0]);
  }

  async update(id, nome, quantidade) {
    const { rows } = await db.query(
      'UPDATE produtos SET nome = $1, quantidade = $2 WHERE id = $3 RETURNING id, nome, quantidade',
      [nome, quantidade, id]
    );
    return rows.length ? new Product(rows[0]) : null;
  }

  async delete(id) {
    const { rows } = await db.query(
      'DELETE FROM produtos WHERE id = $1 RETURNING id, nome, quantidade',
      [id]
    );
    return rows.length ? new Product(rows[0]) : null;
  }
}

module.exports = ProductRepository;
