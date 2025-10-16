//02

const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json());

async function validaNumeros(pNumeros) {
    for (let index = 0; index < pNumeros.length; index++) {
        if (typeof pNumeros[index] !== "number") {
            throw new Error("Valor inválido");
        }
    }
    return pNumeros
}

async function soma(pNumeros) {
    try {
        const numeros = await validaNumeros(pNumeros);
        const soma = numeros.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0); //'0' é o valor inicial do acumulador
        return soma
    } catch (error) {
        throw new Error(`Erro ao realizar a operação: ${error.message}`);
    }
}


app.post('/soma', async (req, res) => {
    try {
        const { numeros } = req.body;
        const resultadoSoma = await soma(numeros);

        res.status(201).json({ soma: resultadoSoma });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao processar a solicitação', erro: error.message });
    }
});


app.use((req, res) => {
    res.status(404).json('Página não encontrada');
});

app.listen(PORT, () => {
    console.log(`Atividade rodando em http://localhost:${PORT}`);
});



// 2. Crie um projeto que contenha uma rota POST /soma e receba uma quantidade indefinida de números através do body e realize a soma dos valores:
// Verifique se os valores são numéricos antes de realizar o cálculo, caso não seja informa ao usuário e não realizar o cálculo.
// Utilize a função reduce, pesquise em fontes na internet a forma de utilizar.



