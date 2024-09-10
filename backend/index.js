const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

//array de objetos produtos - Banco de dados falso
const produtos = [
    {
        id: 1,//Adicionar um id único em cada produto
        nome:"Teclado Gamer",
        precoUnitario: 500,
        quantidade: 50,
        categoria: "Periféricos",
        fabricante: "Toyota"
    },
    {
        id: 2,//Adicionar um id único em cada produto
        nome: "Teclado Mecânico",
        precoUnitario: 350,
        quantidade: 100,
        categoria: "Periféricos",
        fabricante: "Nokia"
    },
    {
        id: 3,//Adicionar um id único em cada produto
        nome: "Monitor 4K",
        precoUnitario: 2500,
        quantidade: 30,
        categoria: "Eletrônicos",
        fabricante: "Dell"
    } 
];

//Endpoint para obter produtos
app.get('/produtos', (req, res) =>{
    res.status(200).json(produtos);
});

// Obter um produto específico pelo ID
app.get('/produtos/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === produtoId);

    if (produto) {
        res.status(200).json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// Adicionar um novo produto
app.post('/produtos', (req, res) => {
    // Recebe os dados do novo produto do corpo da requisição (req.body)
    const novoProduto = req.body;
    // Gerar um ID único para o novo produto
    novoProduto.id = produtos.length + 1; 
    produtos.push(novoProduto);
    // Retorna o novo produto com status 201 (Criado)
    res.status(201).json(novoProduto);
});

const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});