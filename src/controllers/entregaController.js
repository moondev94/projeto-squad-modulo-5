// entregas não está completa. Falta implementar as funcionalidades

// Importa o bd.js para poder usar o banco de dados simulado
const { bdEntregas } = require("../infra/bd.js")

class entregaController {
    static rotas(app){
        // Rota para o recurso entrega
        app.get('/entrega', entregaController.listar)
        app.post('/entrega', entregaController.inserir)
    }

    static listar(req, res){
        const entregas = bdEntregas
        // Devolve a lista de entregas
        res.send(entregas)
    }

    static inserir(req, res){
        res.send('Rota ativada com POST e recurso entrega: entrega deve ser inserida')
        // Console log do corpo da requisição
        console.log(req.body)
    }
}

module.exports = entregaController