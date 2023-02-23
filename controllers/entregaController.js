
const EntregaDAO = require('../DAO/EntregaDAO')
const Entrega = require('../models/Entrega')

class entregaController {
    static rotas(app){
        app.get('/entrega', entregaController.listar)
        app.get('/entrega/id/:id', entregaController.buscarPorID)
        app.post('/entrega', entregaController.inserir)
        app.put('/entrega/id/:id', entregaController.atualizar)
        app.delete('/entrega/id/:id', entregaController.deletar)
    }


    static async listar(req, res){
        const entrega = await EntregaDAO.listar()

        res.status(200).send(entrega)
    }

    static async buscarPorID(req, res){
        const entrega = await EntregaDAO.buscarPorID(req.params.id)

    
        if(!entrega){
            res.status(404).send('Informações de entrega não encontradas no banco.')
        }
    
        res.status(200).send(entrega)

    }

    static async inserir(req, res){
        const entrega = {
            id: req.body.id,
            endereco: req.body.endereco,
            cliente: req.body.cliente,
            id_produto: req.body.id_produto,
            id_cliente: req.body.id_cliente
        }

        const result = await EntregaDAO.inserir(entrega)

        res.status(201).send({"Mensagem": "Informações de entrega incluídas com sucesso!", "Nova entrega: ": result})    
    }


    static async atualizar(req, res) {
        const entrega = new Entrega(req.body.id, req.body.endereco, req.body.cliente, req.body.id_produto, req.body.id_cliente)

        if (!entrega) {
            res.status(404).send('Informações de entrega não encontradas no banco')
        }
        const result = await EntregaDAO.atualizar(req.params.id, entrega)
        if(result.erro){
            res.status(500).send('Erro ao atualizar as informações de entrega no banco')
          }


        res.status(201).send({"Mensagem": "Informações de entrega atualizadas!", "Nova entrega: ": entrega})
    }


    static async deletar(req, res) {
        const entrega = await EntregaDAO.deletar(req.params.id)

        if(!entrega){
            res.status(404).send('Informações de entrega não encontradas no banco')
        }

        res.status(204).send({"Mensagem": 'As informaçoes de entrega foram excluídas'})
    }
}


module.exports = entregaController


