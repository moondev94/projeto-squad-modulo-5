// Importando o packages
const express = require('express')

// instanciando o servidor
const app = express()

// Importa o cors
const cors = require('cors')

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json())

app.use(cors())

// importando os controllers
const clienteController = require('./controllers/clienteController.js')
const produtoController = require('./controllers/produtoController.js')

clienteController.rotas(app)
produtoController.rotas(app)

module.exports = app
