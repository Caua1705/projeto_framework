const express = require('express');// cria o servidor e controla as rotas e requisições

const cors = require('cors');// Ativa o CORS para liberar acesso a outras origens (ex: front em outra porta)


const app = express();

app.use(cors());           // libera acesso externo (front, outras portas)
app.use(express.json());   // para o Express entender JSON no body das requisições

// Importa o objeto da rota
const usuariosRouter = require('./routes/usuarios');

// Monta as rotas com o prefixo '/usuarios'
app.use('/usuarios', usuariosRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
