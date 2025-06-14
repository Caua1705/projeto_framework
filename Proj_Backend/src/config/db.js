// Importa a classe PrismaClient do módulo @prisma/client
const { PrismaClient } = require('@prisma/client')

// Cria uma nova instância do PrismaClient para acessar o banco de dados
const prisma = new PrismaClient()

// Exporta a instância criada para que possa ser usada em outros arquivos
module.exports = prisma