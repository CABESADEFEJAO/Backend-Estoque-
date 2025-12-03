// services/AuthService.js
const UserRepository = require('../repositories/UserRepository');

class AuthService {
  constructor() {
    this.userRepo = new UserRepository();
  }

  async register(nome, senha) {
    if (!nome || !senha) {
      throw new Error('Nome e senha são obrigatórios.');
    }

    const existing = await this.userRepo.findByName(nome);
    if (existing) {
      throw new Error('Nome de usuário já existe.');
    }

    // aqui poderia ter hash de senha, mas vamos simples
    const user = await this.userRepo.create(nome, senha);
    return user;
  }

  async login(nome, senha) {
    if (!nome || !senha) {
      throw new Error('Nome e senha são obrigatórios.');
    }

    const user = await this.userRepo.findByName(nome);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    if (user.senha !== senha) {
      throw new Error('Senha incorreta.');
    }

    return user;
  }
}

module.exports = AuthService;
