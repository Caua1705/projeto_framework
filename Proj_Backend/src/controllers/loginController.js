// Importa a função criarUsuario do arquivo de model usuarioModel.js
const { criarUsuario, editarUsuario, deletarUsuario, recuperarUsuarios, recuperarUsuariosPorNome } = require('../models/loginModel');


// Implementação do controlador para obter todos os usuários
async function getAllUsers_Controller(req, res) {
  try {
    // Chama a função recuperarUsuarios para obter todos os usuários do banco de dados
    const usuarios = await recuperarUsuarios();

    // Se não houver usuários, retorna uma resposta com sucesso, mas sem usuários
    return res.json({ sucesso: true, usuarios });

  } catch (error) {
    // Se ocorrer um erro, captura e responde com status 500 (Internal Server Error)
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao buscar usuários', erro: error.message });
  }
};


// Implementação do controlador para obter usuário por nome de usuário
async function getUserByUsername_Controller(req, res) {
  const { username } = req.params;

  // Verifica se o parâmetro username foi fornecido
  if (!username) {
    return res.status(400).json({ sucesso: false, mensagem: 'Parâmetro username é obrigatório' });
  }

  try {
    // Chama a função recuperarUsuariosPorNome passando o username fornecido
    const usuario = await recuperarUsuariosPorNome(username);

    // Se o usuário não for encontrado, retorna um erro 404
    if (!usuario) {
      return res.status(404).json({ sucesso: false, mensagem: `Usuário "${username}" não encontrado` });
    }

    // Se o usuário for encontrado, retorna os dados do usuário
    return res.json({ sucesso: true, usuario });

  } catch (error) {
    // Se ocorrer um erro, captura e responde com status 500 (Internal Server Error)
    return res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao buscar usuário', erro: error.message });
  }
};


// Implementação do controlador para criar um novo usuário
async function createUser_Controller(req, res) {
  // Extrai os dados nome_usuario e senha do corpo da requisição (JSON enviado pelo cliente)
  const { username, password } = req.body;

  try {
    // Chama a função criarUsuario atribuindo o valor passado pelo req.body no argumento
    const novoUsuario = await criarUsuario(username, password);

    // Se sucesso, responde para o cliente com status 201 (criado) e os dados do usuário criado em JSON
    res.status(201).json({ sucesso: true, mensagem: "Usuario criado com sucesso", novoUsuario });

  } catch (error) {
    // Se der erro, captura aqui e responde para o cliente com status 400 (Erro na requisição)
    // Envia um objeto JSON contendo a mensagem de erro para ajudar no diagnóstico
    res.status(400).json({ sucesso: false, mensagem: 'Erro ao criar o usuário', erro: error.message });
  };
};


// Implementação do controlador para editar um usuário
async function editUser_Controller(req, res) {
  // Extrai os dados do corpo da requisição (JSON enviado pelo cliente)
  const { id, username, password } = req.body;

  try {
    // Chama a função editarUsuario atribuindo o valor passado pelo req.body no argumento
    const usuarioAtualizado = await editarUsuario(id, username, password);

    // Se sucesso, responde para o cliente com status 200 e os dados atualizados
    res.status(201).json({ sucesso: true, mensagem: "Usuário editado com sucesso", usuarioAtualizado });

  } catch (error) {
    // Se der erro, captura aqui e responde para o cliente com status 400 (Erro na requisição)
    // Envia um objeto JSON contendo a mensagem de erro para ajudar no diagnóstico
    res.status(400).json({ sucesso: false, mensagem: 'Erro ao editar o usuário', erro: error.message });
  };
};


// Implementação do controlador para deletar usuário por ID
async function deleteUser_Controller(req, res) {
  // Extrai o id da URL (O id é passado como parâmetro na rota, por exemplo: /usuarios/1)
  const { id } = req.params;

  // Verifica se o parâmetro id foi fornecido
  if (!id) {
    return res.status(400).json({ sucesso: false, mensagem: 'Parâmetro id é obrigatório' });
  }

  try {
    // Chama a função deletarUsuario com o id extraído da URL
    const idUsuarioRemovido = await deletarUsuario(id);

    // Se sucesso, responde para o cliente com status 200 (removido) e os dados do usuário criado em JSON
    res.status(200).json({ sucesso: true, mensagem: "Usuario removido com sucesso", idUsuarioRemovido });

  } catch (error) {
    // Se ocorrer um erro, captura e responde com status 500 (Internal Server Error)
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao deletar o usuário.', erro: error.message });
  };
};


// Exporta as funcoes do Controller
module.exports = {
  getAllUsers_Controller,
  getUserByUsername_Controller,
  createUser_Controller,
  editUser_Controller,
  deleteUser_Controller
};
