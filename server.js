const express = require('express');
const cors = require('cors');
const path = require('path');

const AuthController = require('./controllers/AuthController');
const ProductController = require('./controllers/ProductController');

const app = express();

app.use(cors());
app.use(express.json());

// ======== SERVE O FRONT CORRETAMENTE, SEM DEPENDER DA PASTA ONDE VOCÊ RODA ========
const publicPath = path.join(__dirname, 'public');
console.log('Servindo arquivos estáticos de:', publicPath);
app.use(express.static(publicPath));

// Rotas explícitas (mesmo que estático já resolva, isso garante)
app.get('/cadastro.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'cadastro.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// ======== CONTROLLERS EM POO ========
const auth = new AuthController();
const product = new ProductController();

// AUTH
app.post('/login', auth.login);
app.post('/usuarios', auth.register);

// PRODUTOS
app.get('/produtos', product.list);
app.post('/produtos', product.create);
app.put('/produtos/:id', product.update);
app.delete('/produtos/:id', product.remove);

// ======== START ========
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
