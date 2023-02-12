// Importa o bd.js para poder usar o banco de dados simulado
const { bdProdutos } = require("../infra/bd.js")

const Produto = require('../models/Produto.js')

class produtoController {
    static rotas(app){
        // Rota para o recurso produto
        app.get('/produto', produtoController.listar)
        app.get('/produto/id/:id', produtoController.buscarPorID)
        app.post('/produto', produtoController.inserir)
        app.put('/produto/id/:id', produtoController.atualizaProduto)
        app.delete('/produto/id/:id', produtoController.deletarProduto)
    }
    

    static listar(req, res){
        const produtos = bdProdutos
        // Devolve a lista de produtos
        res.send(produtos)
    }


    static inserir(req, res){
        const produto = new Produto(req.body.nome, req.body.descricao, req.body.id, req.body.preco)
        bdProdutos.push(produto)
        res.send(bdProdutos)
        // Console log do corpo da requisição
        console.log(req.body)        
    }


    static buscarPorID(req, res){
        // Busca o id na lista de produtos
        const produto = bdProdutos.find(produto => produto.id === req.params.id)
        console.log(produto)
        // Se o produto não for encontrado, devolve um erro
        if(!produto){
            res.status(404).send('Item não encontrado')
        }
        // Se o produto for encontrado, devolve o produto
        res.send(produto)
    }


    static deletarProduto(req, res){
        // Busca o id na lista de produtos
        const produto = bdProdutos.find(produto => produto.id === req.params.id)
        // Se o produto não for encontrado, devolve um erro
        if(!produto){
            res.status(404).send('Item não encontrado')
        }
        // Se o Produto for encontrado, deleta o Produto
        const index = bdProdutos.indexOf(produto)
        bdProdutos.splice(index, 1)
        // Devolve o produto deletado
        res.status(200).send({"Mensagem: ": `O produto ${produto.id} foi deletado`} )
    }

    static atualizaProduto(req, res){
        // Busca o email na lista de produtos
        const produto = bdProdutos.find(produto => produto.id === req.params.id)

        // Se o produto não for encontrado, devolve um erro
        if (!produto){
            res.send('Item não encontrado')
            return
        }

        // Produto atualizado
        produto.nome = req.body.nome
        produto.descricao = req.body.descricao
        produto.id = req.body.id
        produto.preco = req.body.preco

        res.send(bdProdutos)

    }
}

module.exports = produtoController