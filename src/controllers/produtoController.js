// Importa o bd.js para poder usar o banco de dados simulado
const ProdutoDAO = require("../DAO/ProdutoDAO.js")
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
    
    //GET
    static async listar(req, res){
        const produto = await ProdutoDAO.listar()
        // Devolve a lista de produtos
        res.status(200).send(produto)
    }

    static async buscarPorID(req, res){
        //Busca o id na lista de produtos
        const produto = await ProdutoDAO.buscarPorID(req.params.id)

        //Se o produto não for encontrado, devolve um erro
        if(!produto){
            res.status(404).send('Produto não encontrado')
        }
        //Produto encontrado
        res.status(200).send(produto)

    }


    //POST
    static async inserir(req, res){
        const produto = {
            id: req.body.id, 
            nome: req.body.nome,
            marca: req.body.marca,
            modelo: req.body.modelo,
            descricao: req.body.descricao,
            valor: req.body.valor
        }

        if (!produto || !produto.id || !produto.nome || !produto.marca || !produto.modelo || !produto.descricao || !produto.valor){
            res.status(400).send("É necessário passar todas as informações")
            return
        } 
        
        const result = await ProdutoDAO.inserir(produto)

        if(result.erro) {
            res.status(500).send(result)
        }

        res.status(201).send({"Mensagem": "Produto adicionado com sucesso", "Novo produto: ": produto})
    }


    //PUT 
    static async atualizaProduto(req, res){
        // Busca o id na lista de produtos
        const id = await ProdutoDAO.buscarPorID(req.params.id)

        // Se o produto não for encontrado, devolve um erro
        if (!id){
            res.status(404).send('Item não encontrado')
            return
        }

        const produto = new Produto(req.body.id, req.body.nome, req.body.marca, req.body.modelo, req.body.descricao, req.body.valor)
         if (!produto || !produto.id || !produto.nome || !produto.marca || !produto.modelo || !produto.descricao || !produto.valor){
             res.status(400).send("É necessário passar todas as informações")
            return 
         }
         
         if(!Object.keys(produto).length) {
            res.status(400).send('O objeto esta sem chaves')
            return
        }

        const result = await ProdutoDAO.atualizar(req.params.id, produto)
        if (result.erro) {
            res.status(500).send('Erro ao atualizar o produto')
            return
        }

        res.status(200).send({"Mensagem": "Dados atualizados", "Produto: ": produto})
    }


    //DELETE
    static async deletarProduto(req, res){

        const produto = await ProdutoDAO.buscarPorID(req.params.id)

        if(!produto) {
            res.status(404).send({'Mensagem': 'Produto não encontrado'})
        }

        const result = await ProdutoDAO.deletar(req.params.id)

        if (result.erro) {
            res.status(400).send({'Mensagem': 'Produto não deletado'})
            return
        }

        res.status(200).send(result)
    }

    


}

module.exports = produtoController