// controllers/AuthController.js
const AuthService = require('../services/AuthService');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  // POST /usuarios
  register = async (req, res) => {
    try {
      const { nome, senha } = req.body;

      const user = await this.authService.register(nome, senha);

      return res.status(201).json({
        id: user.id,
        nome: user.nome
      });
    } catch (err) {
      console.error('Erro na rota /usuarios:', err);
      return res
        .status(400)
        .json({ error: err.message || 'Erro ao cadastrar usuário' });
    }
  };

  // POST /login
  login = async (req, res) => {
    try {
      const { nome, senha } = req.body;

      const user = await this.authService.login(nome, senha);

      return res.json({
        id: user.id,
        nome: user.nome
      });
    } catch (err) {
      console.error('Erro na rota /login:', err);
      return res
        .status(401)
        .json({ error: err.message || 'Nome ou senha inválidos' });
    }
  };
}

module.exports = AuthController;
