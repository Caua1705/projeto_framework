const prisma = require('../config/db.js') // importando o prisma


// recupera todos os usuários do banco de dados
async function recuperarUsuarios() {
  try {
    const usuarios = await prisma.user.findMany({
      select: { id: true, username: true, password: true }
    });
    return usuarios;
  } catch (error) {
    throw new Error(`Erro ao recuperar usuários: ${error.message}`);
  };
};


// recupera um usuário específico pelo nome de usuário
async function recuperarUsuariosPorNome(username) {
  try {
    // Verifica se o nome de usuário foi fornecido/    
    if (!username) {
      throw new Error('Nome de usuário é obrigatório');
    };
    const usuario = await prisma.user.findUnique({
      where: { username }
    });
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao recuperar usuário: ${error.message}`);
  };
};


// cria um novo usuário com os dados fornecidos
async function criarUsuario(username, password) {
  try {
    const novoUsuario = await prisma.user.create({
      data: {
        username: username,
        password: password
      }
    });
    return novoUsuario
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  };
};



// edita um usuário existente
async function editarUsuario(id, username, password) {
  try {
    const usuarioAtualizado = await prisma.user.update({
      where: { id: id },
      data: { username: username, password: password, }
    });
    return usuarioAtualizado;
  } catch (error) {
    // Você pode logar o erro aqui ou simplesmente repassar para o controller
    throw new Error(`Erro ao editar usuário: ${error.message}`);
  };
};


// deleta o usuário com o ID fornecido
async function deletarUsuario(id_User) {
  try {
    // Verifica se o ID do usuário foi fornecido
    if (!id_User) {
      throw new Error('ID do usuário é obrigatório');
    }
    const usuarioRemovido = await prisma.user.delete({
      where: { id: Number(id_User) }
    });
    return usuarioRemovido;
  } catch (error) {
    throw new Error('Erro ao deletar usuário - ' + error.message);
  }
}

// Exporta as funções do modelo
module.exports = {
  recuperarUsuarios,
  recuperarUsuariosPorNome,
  criarUsuario,
  editarUsuario,
  deletarUsuario
};
