const express = require('express'); // cria o servidor e controla as rotas e requisições
const routerUsuario = express.Router();

// Importando a função controller
const { criarUsuarioController } = require('../controllers/usuarioController');

// Rota: POST /usuarios → chama o controller
routerUsuario.post('/', criarUsuarioController);

//Exporta o objeto da rota
module.exports = routerUsuario;