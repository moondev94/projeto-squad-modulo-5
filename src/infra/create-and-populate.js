const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');


// CRIAÇÃO DO BANCO PRODUTO
const PRODUTO_SCHEMA = `
CREATE TABLE IF NOT EXISTS "PRODUTO" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" varchar(64),
    "marca" varchar(64),
    "modelo" varchar(64),
    "descricao" varchar(100),
    "valor" varchar(64)

);`;
const ADD_PRODUTO_DATA = `
INSERT INTO PRODUTO (id, nome, marca, modelo, descricao, valor) VALUES
(1, 'regata', 'addidas', 'esportivo masculino', 'Regata masculina dry-fit com detalhes reflexivos', '49.99'),
(2, 'regata', 'addidas', 'esportivo feminino', 'Regata feminina dry-fit com detalhes reflexivos', '57.26'),
(3, 'bermuda', 'addidas', 'esportivo masculino', 'Bermuda masculina dry-fit', '84.59'),
(4, 'bermuda', 'addidas', 'esportivo feminino', 'Bermuda feminina dry-fit', '84,59'),
(5, 'kit cueca', 'kalvin clein', 'box', 'Kit com 4 cuecas box com cores sortidas', '129,90')
`
function criaTabelaProduto() {
    db.run(PRODUTO_SCHEMA, (error) => {
        if (error) console.log("Erro ao registrar produto!");
    });
}

function populaTabelaProduto() {
    db.run(ADD_PRODUTO_DATA, (error) => {
        if (error) console.log('Erro ao popular a tabela produto!');
    });
}


// CRIAÇÃO DO BANCO CLIENTE
const CLIENTE_SCHEMA = ` 
CREATE TABLE IF NOT EXISTS "CLIENTE" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" varchar(64),
    "email" varchar(64),
    "endereco" varchar(100),
    "cpf" int(11),
    "telefone" int(09)
);`;

const ADD_CLIENTE_DATA = `
INSERT INTO CLIENTE (id, nome, email, endereco, cpf, telefone) VALUES
(1, 'Marcia Lopes', 'marcia.lopes@email.com', 'Rua da Quitanda, 12', '11111111111', '999999999'),
(2, 'Julian da Silva', 'julian.silva@email.com', 'Avenida Rio Branco, 29', '22222222222', '888888888'),
(3, 'Dom Pedro', 'dom.pedro@email.com', 'Rua Rainha Elizabeth, 56', '33333333333', '777777777')
`
function criaTabelaCliente() {
    db.run(CLIENTE_SCHEMA, (error) => {
        if (error) console.log("Erro ao registrar cliente!");
    });
}

function populaTabelaCliente() {
    db.run(ADD_CLIENTE_DATA, (error) => {
        if (error) console.log("Erro ao popular a tabela cliente!");
    });
}

//CRIAÇÃO DO BANCO DE ENTREGAS
const ENTREGA_SCHEMA = `
CREATE TABLE IF NOT EXISTS "ENTREGA" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "endereco" varchar(100),
    "cliente" varchar(64),
    "id_produto" INTEGER, 
    "id_cliente" INTEGER,
    FOREIGN KEY(id_produto) REFERENCES PRODUTO(id), 
    FOREIGN KEY(id_cliente) REFERENCES CLIENTE(id)
);`;

const ADD_ENTREGA_DATA = `
INSERT INTO ENTREGA (id, endereco, cliente, id_produto, id_cliente) VALUES
(1, 'Avenida Rio Branco, 29', 'Julian da Silva', 1, 2),
(2, 'Rua da Quitanda, 12', 'Marcia Lopes', 2, 1),
(3, 'Rua Rainha Elizabeth, 56', 'Dom Pedro', 3, 3)
`

function criaTabelaEntrega() {
    db.run(ENTREGA_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabebela de entregas!");
    });
}

function populaTabelaEntrega() {
    db.run(ADD_ENTREGA_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela de entregas!");
    });
}

db.serialize( ()=> {
    criaTabelaProduto();
    populaTabelaProduto();
    criaTabelaCliente();
    populaTabelaCliente();
    criaTabelaEntrega();
    populaTabelaEntrega();
});