// Importa o bd.js para poder usar o banco de dados simulado
const ClienteDAO = require('../DAO/ClienteDAO.js')
const Cliente = require('../models/Cliente.js')

class clienteController {
    static rotas(app){
        // Rota para o recurso Cliente
        app.get('/cliente', clienteController.listar)
        app.get('/cliente/id/:id', clienteController.buscarPorID)
        app.post('/cliente', clienteController.inserir)
        app.put('/cliente/id/:id', clienteController.atualizaCliente)
        app.delete('/cliente/id/:id', clienteController.deletarCliente)
    }

    
    //GET
    static async listar(req, res){
        const cliente = await ClienteDAO.listar()
        // Devolve a lista de Clientes
        res.status(200).send(cliente)
    }

    static async buscarPorID(req, res){
        // Busca o id na lista de Clientes
        const cliente = await ClienteDAO.buscarPorID(req.params.id)
        
        // Se o Cliente não for encontrado, devolve um erro
        if(!cliente){
            res.status(404).send('Cliente não encontrado')
        }
        // Se o Cliente for encontrado, devolve o Cliente
        res.status(200).send(cliente)
    }


    //POST
    static async inserir(req, res){
        const cliente = {
            id: req.body.id,
            nome: req.body.nome,
            email: req.body.email,
            endereco: req.body.endereco,
            cpf: req.body.cpf,
            telefone: req.body.telefone
        }

        const result = await ClienteDAO.inserir(cliente)

        res.status(201).send({"Mensagem": "Informações de cliente incluídas com sucesso!", "Novo cliente: ": result})    
    }

    // PUT
    static async atualizaCliente(req, res) {
        const cliente = new Cliente(req.body.id, req.body.nome, req.body.email, req.body.endereco, req.body.cpf, req.body.telefone)

        if (!cliente) {
            res.status(404).send('Cliente não encontrado')
        }
        const result = await ClienteDAO.atualizar(req.params.id, cliente)
        if(result.erro){
            res.status(500).send('Erro ao atualizar as informações do cliente')
          }


        res.status(201).send({"Mensagem": "Informações de cliente atualizadas!", "Novo cliente: ": cliente})
    }
   

    // DELETE

    static async deletarCliente(req, res){

        const cliente = await ClienteDAO.buscarPorID(req.params.id)

        if(!cliente) {
            res.status(404).send({'Mensagem': 'Cliente não encontrado'})
            return
        }

        const result = await ClienteDAO.deletar(req.params.id)

        if(result.erro){
            res.status(400).send({'Mensagem': 'Cliente não deletado'})
            return
        } 

        res.status(204).send(result)
    }

    
    
}

module.exports = clienteController