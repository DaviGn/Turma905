import express from 'express';

import userRoutes from './routes/users.routes';
import citiesRoutes from './routes/cities.routes';

const port = 3333;
const server = express();

// Habilitando a deserialização de JSON
server.use(express.json());

// Adicionar as rotas
server.use('/users', userRoutes);
server.use('/cities', citiesRoutes);

server.listen(port, () => {
  console.log('Server is running!');
});
