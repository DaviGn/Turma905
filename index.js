import express from 'express';

const server = express();

// Habilitando a deserialização de JSON
server.use(express.json());

const users = [];

server.get('/', (request, response) => {
  return response.send(users);
});

server.post('/', (request, response) => {
  const user = request.body;
  users.push(user);
  return response.send(user);
});

server.put('/:id', (request, response) => {
  const { id } = request.params;
  const userIndex = users.findIndex((x) => x.id === Number(id));

  if (userIndex === -1) {
    // Retornar que não encontrou
    return response.send('Not Found!');
  }

  users[userIndex].name = request.body.name;
  users[userIndex].email = request.body.email;

  return response.send(users[userIndex]);
});

server.listen(3333, () => {
  console.log('Server is running!');
});
