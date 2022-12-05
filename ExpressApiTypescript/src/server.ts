import express from 'express';

import userRoutes from './routes/users.routes';

const port = 3333;
const server = express();

// Habilitando a deserialização de JSON
server.use(express.json());

// Adicionar as rotas
server.use('/users', userRoutes);

server.listen(port, () => {
  console.log('Server is running!');
});
