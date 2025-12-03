const db = require('../db');
const User = require('../models/User');

class UserRepository {
  async findByName(nome) {
    const { rows } = await db.query(
      'SELECT id, nome, senha FROM usuarios WHERE nome = $1',
      [nome]
    );
    return rows.length ? new User(rows[0]) : null;
  }

  async findByNameAndPassword(nome, senha) {
    const { rows } = await db.query(
      'SELECT id, nome, senha FROM usuarios WHERE nome = $1 AND senha = $2',
      [nome, senha]
    );
    return rows.length ? new User(rows[0]) : null;
  }

  async create(nome, senha) {
    const { rows } = await db.query(
      'INSERT INTO usuarios (nome, senha) VALUES ($1, $2) RETURNING id, nome, senha',
      [nome, senha]
    );
    return new User(rows[0]);
  }
}

module.exports = UserRepository;
