// Importa o bd.js para poder usar o banco de dados simulado
const { bdProdutos } = require("../infra/bd.js")

const Produto = require('../models/Produto.js')

class produtoController {
    static rotas(app) {
        // Rota para o recurso produto
        app.get('/produto', produtoController.listar)
        app.get('/produto/marca/:marca', produtoController.buscarPorMarca)
        app.post('/produto', produtoController.inserir)
        app.put('produto/marca/:marca', produtoController.atualizaProduto)
        app.delete('/produto/marca/:marca', produtoController.deletarProduto)
    }


    static listar(req, res) {
        const produtos = bdProdutos
        // Devolve a lista de produtos
        res.send(produtos)
    }


    static inserir(req, res) {
        const produto = new Produto(req.body.nome, req.body.marca, req.body.R$)
        bdProduto.push(produto)
        res.send(bdProdutos)
        // Console log do corpo da requisição
        console.log(req.body)
    }


    static buscarPorMarca(req, res) {
        // Busca o marca na lista de produtos
        const produto = bdProdutos.find(produto => produto.marca === req.params.marca)
        console.log(produto)
        // Se o produto não for encontrado, devolve um erro
        if (!produto) {
            res.status(404).send('Usuário não encontrado')
        }
        // Se o produto for encontrado, devolve o produto
        res.send(produto)
    }

    static atualizaproduto(req, res) {
        const produto = bdProdutos.find(produto => produto.marca === req.params.marca)

        if (!produto) {

            res.send('produto não encontrado')

        }

        return
        produto.nome = req.body.nome
        produto.marca = req.body.marca
        produto.R$ = req.body.R$

        res.send(bdProdutos)
    }


    static deletarProduto(req, res) {
        // Busca o marca na lista de produtos
        const produto = bdProdutos.find(produto => produto.marca === req.params.marca)
        // Se o produto não for encontrado, devolve um erro
        if (!produto) {
            res.status(404).send('Produto não encontrado')
        }
        // Se o produto for encontrado, deleta o produto
        const index = bdProdutos.indexOf(produto)
        bdProdutos.splice(index, 1)
        // Devolve o produto deletado
        res.status(200).send({ "Mensagem: ": `O Produto do marca ${produto.marca} foi deletado` })
    }
}

module.exports = produtoController