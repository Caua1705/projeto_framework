const express = require('express'); // carrega o Express, que é um framework para Node.js usado para criar servidores web

const loginRoutes = express.Router(); // Cria o objeto de rotas para o login

// Importando as funcoes do controller
const { 
        getAllUsers_Controller, 
        getUserByUsername_Controller, 
        createUser_Controller,
        editUser_Controller,
        deleteUser_Controller 
    } = require('../controllers/loginController');

// Rotas: GET
loginRoutes.get('/users', getAllUsers_Controller);
loginRoutes.get('/users/:username', getUserByUsername_Controller);

// Rota: POST
loginRoutes.post('/users/register', createUser_Controller);

// Rota: PUT
loginRoutes.put('/users/:id', editUser_Controller);

// Rota: DELETE
loginRoutes.delete('/users/:id', deleteUser_Controller);

//Exporta o objeto da rota
module.exports = loginRoutes;

