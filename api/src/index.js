const express = require('express');
require('express-async-errors');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  // Adiciona um middleware de tratamento de erros ao aplicativo Express.
  // O middleware aceita quatro parâmetros: 'error', 'request', 'response', e 'next'.
  // Este middleware será executado sempre que houver um erro em qualquer parte da aplicação.

  // console.log(error);
  // Exibe o erro no console para facilitar a depuração e o registro.

  response.sendStatus(500);
  // Envia uma resposta com o status 500 (Internal Server Error) ao cliente.
  // Isso indica que ocorreu um erro interno no servidor.
});

// eslint-disable-next-line no-console
app.listen(3001, () => console.log('Server started at http://localhost:3001'));
