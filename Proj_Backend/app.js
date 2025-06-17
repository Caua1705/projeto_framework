const express = require('express'); // carrega o Express, que é um framework para Node.js usado para criar servidores web

const app = express(); // cria o servidor que controla as rotas e requisições

app.use(express.json()); // para fazer com que a aplicação consiga entender requisições com corpo (body) em formato JSON

// carrega o CORS para liberar acesso ao servidor por um front na mesma máquina (e superar a restricao Same-Origin Policy)
const cors = require('cors');
app.use(cors());

// carrega o dotenv e recupera a variável de ambiente PORT do arquivo .env (ou usa 3000 como padrão)
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const loginRoutes = require('./src/routes/loginRoutes.js'); // Importa o objeto de rotas de login

app.use(loginRoutes); // Monta as rotas de login

// Inicia o servidor na porta definida
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
