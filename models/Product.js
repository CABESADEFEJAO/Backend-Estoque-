class Product {
  constructor({ id = null, nome, quantidade }) {
    this.id = id;
    this.nome = nome;
    this.quantidade = quantidade;
  }
}

module.exports = Product;
