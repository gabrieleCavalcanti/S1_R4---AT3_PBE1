//01

const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json());

async function validaNumeros(pNotas) {

    for (let index = 0; index < pNotas.length; index++) {
        if (isNaN(pNotas[index])) {
            throw new Error("Valor inválido", error);
        }
    }
    return pNotas
}

async function soma(pNotas) {
    const notas = await validaNumeros(pNotas);
    let resultado = 0;
    for (let index = 0; index < notas.length; index++) {
        resultado += notas[index]
    }
    return resultado
}

async function media(pNotas) {
    try {
        const resultado = await soma(pNotas);
        mediaNotas = resultado / pNotas.length;
        return mediaNotas;
    } catch (error) {
        throw new Error(`Erro ao realizar a operação: ${error.message}`);
    }

}

app.post('/alunos', async (req, res) => {
    try {
        const { nome, notas } = req.body;
        const mediaAluno = await media(notas);
        const situacao = mediaAluno > 6 ? "APROVADO" : "REPROVADO";

         res.status(201).json({ nome, media: mediaAluno.toFixed(2), situacao });
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





// 1. Crie um projeto que contenha uma rota POST /alunos que receba:
// {
//   "nome": "Ana",
//   "notas": [8, 7, 9, 6]
// }
// Calcular a média e retornar um JSON com nome, média e situação (APROVADO ou REPROVADO).
// Considere acima de 6 para aprovado.






