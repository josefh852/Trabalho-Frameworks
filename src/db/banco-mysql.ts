import mysql, { Connection, RowDataPacket } from "mysql2/promise";

class BancoMysql {
    connection: Connection | null = null;

    async criarConexao() {
        this.connection = await mysql.createConnection({
            host: process.env.dbhost || "localhost",
            user: process.env.dbuser || "root",
            password: process.env.dbpassword || "",
            database: process.env.dbname || "banco1022a",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306,
        });
    }

    async consultar(query: string, params?: any[]) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const [result] = await this.connection.query(query, params);
        return result;
    }

    async finalizarConexao() {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        await this.connection.end();
    }

    async listar(tabela: string) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const [result] = await this.connection.query(`SELECT * FROM ${tabela}`);
        return result;
    }

    async inserir(tabela: string, dados: any) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const colunas = Object.keys(dados).join(", ");
        const valores = Object.values(dados);
        const placeholders = valores.map(() => "?").join(", ");
        const query = `INSERT INTO ${tabela} (${colunas}) VALUES (${placeholders})`;
        const [result] = await this.connection.query(query, valores);
        return result;
    }

    async excluir(tabela: string, id: string) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const [result] = await this.connection.query(`DELETE FROM ${tabela} WHERE id = ?`, [id]);
        return result;
    }

    async alterar(tabela: string, id: string, dados: any) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const updates = Object.keys(dados).map((key) => `${key} = ?`).join(", ");
        const valores = [...Object.values(dados), id];
        const query = `UPDATE ${tabela} SET ${updates} WHERE id = ?`;
        const [result] = await this.connection.query(query, valores);
        return result;
    }

    async listarPorId(tabela: string, id: string) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const [result] = await this.connection.query(`SELECT * FROM ${tabela} WHERE id = ?`, [id]) as RowDataPacket[];
        return result[0];
    }
}

export default BancoMysql;
