// Importa a função criarUsuario do arquivo de model usuarioModel.js
const { criarUsuario } = require('../models/usuarioModel')

// Define uma função assíncrona que será usada como controlador para criar usuário
async function criarUsuarioController(req, res) {
  // Extrai os dados nome_usuario e senha do corpo da requisição (JSON enviado pelo cliente)
  const { nome_usuario, senha } = req.body

  try {
    // Chama a função criarUsuario atribuindo o valor passado pelo req.body no argumento
    const usuarioCriado = await criarUsuario(nome_usuario, senha)

    // Se sucesso, responde para o cliente com status 201 (Criado) e os dados do usuário criado em JSON
    res.status(201).json(usuarioCriado)
  } catch (error) {
    // Se der erro, captura aqui e responde para o cliente com status 400 (Erro na requisição)
    // Envia um objeto JSON contendo a mensagem de erro para ajudar no diagnóstico
    res.status(400).json({ error: error.message })
  }
}

// Exporta a função criarUsuarioController para ser usada em outro arquivo (ex: arquivo de rotas)
module.exports = { criarUsuarioController }