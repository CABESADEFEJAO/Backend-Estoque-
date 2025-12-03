class User {
  constructor({ id = null, nome, senha }) {
    this.id = id;
    this.nome = nome;
    this.senha = senha;
  }
}

module.exports = User;
