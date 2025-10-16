//04

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8081;

const arquivoUsuarios = path.join(__dirname, 'usuarios.json');

app.use(express.json());



async function validaNome(nome) {
    if (!nome || nome.length < 3) {
        throw new Error('O nome deve ter no mínimo 3 caracteres.');
    }
    return nome;
}

async function validaEmail(email) {
    if (!email || !email.includes('@')) {
        throw new Error('O email deve conter o caractere "@".');
    }
    return email;
}

async function validaSenha(senha) {
    if (!senha || senha.length < 4) {
        throw new Error('A senha deve ter no mínimo 4 caracteres.');
    }
    return senha;
}


app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const nomeUser = await validaNome(nome);
        const emailUser = await validaEmail(email);
        const senhaUser = await validaSenha(senha);
        
        let usuarios =[];

        if (fs.existsSync(arquivoUsuarios)) {
            usuarios = JSON.parse(fs.readFileSync(arquivoUsuarios, 'utf-8'));
        }

        const novoUsuario = { nome: nomeUser, email: emailUser, senha: senhaUser };
        usuarios.push(novoUsuario);

        fs.writeFileSync(arquivoUsuarios, JSON.stringify(usuarios, null, 2), 'utf-8'); 

        res.status(201).json({ mensagem: 'Usuário salvo com sucesso!' });
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





// 4. Crie um projeto com uma rota POST /usuarios que receba um JSON com:
// nome, email e senha;
// Nome deve ter no minimo 3 caracteres, email deve conter @ e senha no mínimo 4 caracteres
// Salvar o  registro em um arquivo usuarios.json na raiz da aplicação (o arquivo deve ser criado através da codificação)
