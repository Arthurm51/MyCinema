// Importa o módulo 'pg' que é um cliente para interagir com bancos de dados PostgreSQL.
// Aqui estamos usando a desestruturação para obter a classe 'Client' do módulo 'pg'.
// eslint-disable-next-line import/no-unresolved
const { Client } = require('pg');

// Cria uma nova instância do cliente 'Client' e passa um objeto de configuração com
// os detalhes necessários para se conectar ao banco de dados.
const client = new Client({
  // Define o endereço do servidor do banco de dados. Aqui estamos usando 'localhost',
  // o que significa que o banco de dados está sendo executado na mesma máquina que o código.
  host: 'localhost',

  // Define a porta na qual o servidor do banco de dados está ouvindo. A porta padrão
  // para PostgreSQL é 5432.
  port: 5432,

  // Define o nome do usuário que será usado para se autenticar no banco de dados.
  user: 'root',

  // Define a senha correspondente ao usuário especificado para se autenticar no banco de dados.
  password: 'root',

  // Define o nome do banco de dados ao qual queremos nos conectar.
  database: 'mycinema',
});

// Estabelece a conexão com o banco de dados usando o método 'connect' do cliente.
// Isso inicia a conexão com os parâmetros fornecidos anteriormente.
client.connect();

// Envia a consulta SQL para o servidor PostgreSQL para ser executada. Quando a consulta é concluída com sucesso, a promessa é resolvida e o método .then() é chamado.
client.query('SELECT * FROM productions').then(console.log);
