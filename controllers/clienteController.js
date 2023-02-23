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
        const clientes = await ClienteDAO.listar()
        // Devolve a lista de Clientes
        res.status(200).send(clientes)
    }

    static async buscarPorID(req, res){
        // Busca o email na lista de Clientes
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
        if (!cliente || !cliente.id || !cliente.email || !cliente.endereco || !cliente.cpf || cliente.telefone) {
            res.status(400).send("É necessário passar as informações")
            return
        }

        const result = await ClienteDAO.inserir(cliente)

        if(result.erro) {
            res.status(500).send(result)
        }
        
        res.status(201).send({"Mensagem": "Cliente adicionado com sucesso", "Novo cliente: ": cliente})
    }


    //PUT

    static async atualizaCliente(req, res){
        // Busca o email na lista de Clientes
        const id = await ClienteDAO.buscarPorID(req.params.id)

        // Se o Cliente não for encontrado, devolve um erro
        if (!id){
            res.status(404).send('Cliente não encontrado')
            return
        }

        const cliente = new Cliente(req.body.id, req.body.nome, req.body.email, req.body.endereco, req.body.cpf, req.body.telefone)

        if (!cliente || !cliente.id || !cliente.email || !cliente.endereco || !cliente.cpf || cliente.telefone) {
            res.status(400).send("É necessário passar as informações")
            return
        }

        if(!Object.keys(cliente).lenght) {
            res.status(400).send('O objeto está sem chaves')
            return
        }

        const result = await ClienteDAO.atualizar(req.params.id, cliente)

        if (result.erro) {
            res.status(500).send('Erro ao atualizar o cliente')
            return
        }

        res.status(200).send({"Mensagem": "Dados atualizados", "Cliente: ": cliente})
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

        res.status(200).send(result)
    }

    
    
}

module.exports = clienteController