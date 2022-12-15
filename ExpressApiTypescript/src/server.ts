import 'express-async-errors';
import express from 'express';

import { seed } from './seed';
import logs from './middlewares/logs';
import errors from './middlewares/errors';
import routes from './routes';

const port = 3333;

function runServer() {
  const server = express();

  // Middleware
  // Habilitando a deserialização de JSON
  server.use(express.json());

  server.use(logs);

  // Adicionar as rotas
  server.use(routes);
  server.use(errors);

  server.listen(port, () => {
    console.log('Server is running!');
  });
}

seed().then(() => {
  runServer();
});
