const db = require('../infra/bd');

class EntregaDAO {
    static listar() {
        const query = 'SELECT * FROM ENTREGA';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    } 

    static buscarPorID(id) {
        const query = 'SELECT * FROM ENTREGA WHERE ID = ?';
        return new Promise((resolve, reject) => {
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }

    static inserir(entrega) {
        const query = 'INSERT INTO ENTREGA (id, endereco, cliente, id_produto, id_cliente) VALUES (?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [entrega.id, entrega.endereco, entrega.cliente, entrega.id_produto, entrega.id_cliente], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(entrega)
            });
        });
    }

    static atualizar(id, entrega) {
        const query = 'UPDATE ENTREGA SET id = ?, endereco = ?, cliente = ?, id_produto = ?, id_cliente = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [entrega.id, entrega.endereco, entrega.cliente, entrega.id_produto, entrega.id_cliente, id], (err) => {
                if (err) {
                    reject(err);
                }
                resolve({mensagem:'Entrega atualizada'});
            });
        });
    }

    static deletar(id) {
        const query = 'DELETE FROM ENTREGA WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [id], (err) => {
                if (err) {
                    reject(err);
                }
                resolve({mensagem: 'Entrega excluída com sucesso', id: id});
            });
        });
    }

}


module.exports = EntregaDAO;