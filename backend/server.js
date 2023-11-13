const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost'
}))

const pool_bd1 = new Pool({
  user: 'jessi_sd',
  host: 'db1',
  database: 'db1',
  password: 'teste',
  port: 5432, // A porta padrão do PostgreSQL é 5432
});

app.get('/', (req,res) => {
    res.send("Hello World!")
})
// Rota para receber a requisição
app.post('/api/receber-valor-b1', (req, res) => {
  const valorRecebido = req.body.valor;

  if (valorRecebido) {
    pool_bd1.query('INSERT INTO nomes (Nome) VALUES ($1)', [valorRecebido], (error, results) => {
      if (error) {
        console.error('Erro ao inserir valor:', error);
        res.status(500).json({ erro: 'Erro ao inserir valor na tabela.' });
      } else {
        console.log('Nome inserido com sucesso: ', valorRecebido);
        res.json({ mensagem: 'Valor recebido com sucesso!' });
      }
    });

    //res.send("Valor recebido!")
    //res.json({ mensagem: 'Valor recebido com sucesso!' });

  } else {
    //res.send("Deu pau, fml")
    res.status(400).json({ erro: 'Nenhum valor recebido.' });
  }
});

app.post('/api/remover-valor-b1', (req, res) => {
  const valorParaRemover = req.body.valor;

  if (!valorParaRemover) {
    return res.status(400).json({ erro: 'Nenhum valor para remover recebido.' });
  }

  const query = 'DELETE FROM nomes WHERE Nome = $1';

  pool_bd1.query(query, [valorParaRemover], (error, results) => {
    if (error) {
      console.error('Erro ao remover valor:', error);
      return res.status(500).json({ erro: 'Erro ao remover valor da tabela.' });
    }

    if (results.rowCount === 0) {
      console.log("Não houve alterações porque o nome não era registrado.")
      return res.json({ mensagem: 'Nome não encontrado na tabela. Nenhuma ação foi realizada.' });
    }

    console.log(`Nome removido com sucesso: ${valorParaRemover}`);
    return res.json({ mensagem: `Nome '${valorParaRemover}' removido com sucesso da tabela.` });
  });
});

// --------------------------------------------- BD2 ---------------------------------------

const pool_bd2 = new Pool({
  user: 'jessi_sd',
  host: 'db2',
  database: 'db2',
  password: 'teste',
  port: 5432, // A porta padrão do PostgreSQL é 5432
});

app.post('/api/receber-valor-b2', (req, res) => {
  const valorRecebido = req.body.valor;

  if (valorRecebido) {
    pool_bd2.query('INSERT INTO nomes (Nome) VALUES ($1)', [valorRecebido], (error, results) => {
      if (error) {
        console.error('Erro ao inserir valor:', error);
        res.status(500).json({ erro: 'Erro ao inserir valor na tabela.' });
      } else {
        console.log('Nome inserido com sucesso: ', valorRecebido);
        res.json({ mensagem: 'Valor recebido com sucesso!' });
      }
    });

    //res.send("Valor recebido!")
    //res.json({ mensagem: 'Valor recebido com sucesso!' });

  } else {
    //res.send("Deu pau, fml")
    res.status(400).json({ erro: 'Nenhum valor recebido.' });
  }
});

app.post('/api/remover-valor-b2', (req, res) => {
  const valorParaRemover = req.body.valor;

  if (!valorParaRemover) {
    return res.status(400).json({ erro: 'Nenhum valor para remover recebido.' });
  }

  const query = 'DELETE FROM nomes WHERE Nome = $1';

  pool_bd2.query(query, [valorParaRemover], (error, results) => {
    if (error) {
      console.error('Erro ao remover valor:', error);
      return res.status(500).json({ erro: 'Erro ao remover valor da tabela.' });
    }

    if (results.rowCount === 0) {
      // Nenhum registro foi removido, pois o nome não foi encontrado
      console.log("Não houve alterações porque o nome não era registrado.")
      return res.json({ mensagem: 'Nome não encontrado na tabela. Nenhuma ação foi realizada.' });
    }

    console.log(`Nome removido com sucesso: ${valorParaRemover}`);
    return res.json({ mensagem: `Nome '${valorParaRemover}' removido com sucesso da tabela.` });
  });
});

// --------------------------------------------------------------- Comparar nomes

app.post('/api/verificar-nome', async (req, res) => {
  const nomeParaVerificar = req.body.nome;

  //  verificar a presença do nome nas tabelas
  const query1 = 'SELECT Nome FROM nomes WHERE Nome = $1';
  const query2 = 'SELECT Nome FROM nomes WHERE Nome = $1';

  let nomeEncontradoTabela1 = false;
  let nomeEncontradoTabela2 = false;

  try {
    const result1 = await pool_bd1.query(query1, [nomeParaVerificar]);
    if (result1.rowCount > 0) {
      nomeEncontradoTabela1 = true;
    }
  } catch (error) {
    console.error('Erro na consulta à tabela 1:', error);
  }

  try {
    const result2 = await pool_bd2.query(query2, [nomeParaVerificar]);
    if (result2.rowCount > 0) {
      nomeEncontradoTabela2 = true;
    }
  } catch (error) {
    console.error('Erro na consulta à tabela 2:', error);
  }

  const mensagem = nomeEncontradoTabela1 && nomeEncontradoTabela2
    ? `O nome ${nomeParaVerificar} está presente nas duas tabelas!`
    : `O nome ${nomeParaVerificar} não está presente nas duas tabelas!`;

  res.json({ mensagem });
});


const porta = 3333;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
