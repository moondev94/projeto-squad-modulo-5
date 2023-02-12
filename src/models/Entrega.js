class Pedido{
    constructor(cliente, endereco, status, pagamento){
        this.cliente = cliente
        this.endereco = endereco
        this.status = status
        this.pagamento = pagamento
    }
}

module.exports = Pedido