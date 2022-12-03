import express from 'express';

const port = 3333;
const server = express();

// Habilitando a deserialização de JSON
server.use(express.json());

let users: any[] = [];

server.get('/', (request, response) => {
  return response.send(users);
});

server.get('/:id', (request, response) => {
  const { id } = request.params;
  const user = users.find((x) => x.id === Number(id));

  if (!user) {
    return response.send('User not found!');
  }

  return response.send(user);
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

server.delete('/:id', (request, response) => {
  const { id } = request.params;
  users = users.filter((x) => x.id !== Number(id));
  return response.send('Deleted!');
});

server.listen(port, () => {
  console.log('Server is running!');
});
