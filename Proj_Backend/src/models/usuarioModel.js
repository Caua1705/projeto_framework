const prisma = require('../config/db') // importando o prisma

async function criarUsuario(nome_usuario, senha) {
  try {
    const novoUsuario = await prisma.user.create({
      data: {
        username:nome_usuario,
        password:senha
      }
    })
    return novoUsuario
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message)
  }
}

module.exports = { criarUsuario }