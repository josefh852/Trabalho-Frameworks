import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import BancoMysql from './db/banco-mysql'

const app = express()
app.use(express.json())
app.use(cors())

app.get("/produtos", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022a",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        })
        const [result, fields] = await connection.query("SELECT * from produtos")
        await connection.end()
        res.send(result)
    } catch (e) {
        res.status(500).send("Server ERROR")
    }
})
app.post("/produtos", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022a",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        })
        const {id,nome,descricao,preco,imagem,imagem2,estoque} = req.body
        const [result,fields] =
        await connection.query("INSERT INTO produtos VALUES (?,?,?,?,?,?,?)",
            [id,nome,descricao,preco,imagem,imagem2,estoque])
        await connection.end()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})

app.get("/pistas", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022a",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        })
        const [result, fields] = await connection.query("SELECT * from pistas")
        await connection.end()
        res.send(result)
    } catch (e) {
        res.status(500).send("Server ERROR")
    }
})
app.post("/pistas", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022a",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        })
        const {id,nome,descricao,preco,imagem,imagem2,estoque} = req.body
        const [result,fields] =
        await connection.query("INSERT INTO pistas VALUES (?,?,?,?,?,?,?)",
            [id,nome,descricao,preco,imagem,imagem2,estoque])
        await connection.end()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})

//DELETAR
app.delete("/produtos/:id",async(req,res)=>{
    try{
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.excluir(req.params.id)
        await banco.finalizarConexao()
        res.status(200).send("Produto excluido com sucesso id: "+req.params.id)
    }
    catch(e){
        console.log(e)
        res.status(500).send("Erro ao excluir")
    }
    
})

//ALTERAR
app.put("/produtos/:id",async(req,res)=>{
    const {nome,descricao,preco,imagem,imagem2,estoque} = req.body
    const produto = {nome,descricao,preco,imagem,imagem2,estoque}
    const banco = new BancoMysql()
    await banco.criarConexao()
    const result = await banco.alterar(req.params.id,produto)
    await banco.finalizarConexao()
    res.status(200).send("Produto alterado com sucesso id: "+req.params.id)
})

app.listen(8000, () => {
    console.log("Iniciei o servidor")
})