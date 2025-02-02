import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import BancoMysql from './db/banco-mysql'

const app = express()
app.use(express.json())
app.use(cors())

app.get("/:tabela", async (req, res) => {
    try {
        const banco = new BancoMysql();
        await banco.criarConexao();
        const result = await banco.listar(req.params.tabela);
        await banco.finalizarConexao();
        res.send(result);
    } catch (e) {
        res.status(500).send("Erro ao listar dados");
    }
});

app.post("/:tabela", async (req, res) => {
    try {
        const banco = new BancoMysql();
        await banco.criarConexao();
        const result = await banco.inserir(req.params.tabela, req.body);
        await banco.finalizarConexao();
        res.status(201).send("Registro inserido com sucesso!");
    } catch (e) {
        res.status(500).send("Erro ao inserir dados");
    }
});

app.put("/:tabela/:id", async (req, res) => {
    try {
        const banco = new BancoMysql();
        await banco.criarConexao();
        await banco.alterar(req.params.tabela, req.params.id, req.body);
        await banco.finalizarConexao();
        res.status(200).send("Registro alterado com sucesso!");
    } catch (e) {
        res.status(500).send("Erro ao alterar dados");
    }
});

app.delete("/:tabela/:id", async (req, res) => {
    try {
        const banco = new BancoMysql();
        await banco.criarConexao();
        await banco.excluir(req.params.tabela, req.params.id);
        await banco.finalizarConexao();
        res.status(200).send("Registro excluído com sucesso!");
    } catch (e) {
        res.status(500).send("Erro ao excluir dados");
    }
});

app.listen(8000, () => {
    console.log("Iniciei o servidor")
})