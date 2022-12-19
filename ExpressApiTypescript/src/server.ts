import 'express-async-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';

import { seed } from './seed';
import logs from './middlewares/logs';
import errors from './middlewares/errors';
import routes from './routes';

const port = 3333;

function runServer() {
  const server = express();

  // Middleware
  // Habilitando o CORS
  server.use(cors());

  server.use(
    '/content',
    express.static(
      // 'D:\\Git\\LetsCode\\Turma905\\ExpressApiTypescript\\src\\content'
      // D:\Git\LetsCode\Turma905\ExpressApiTypescript\src
      path.join(__dirname, 'content')
    )
  );

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
