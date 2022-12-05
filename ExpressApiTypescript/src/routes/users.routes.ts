import { Router } from 'express';

// Mapeamento as rotas
// /users
const userRoutes = Router();

let users: any[] = [];

userRoutes.get('/', (request, response) => {
  return response.send(users);
});

userRoutes.get('/:id', (request, response) => {
  const { id } = request.params;
  const user = users.find((x) => x.id === Number(id));

  if (!user) {
    return response.send('User not found!');
  }

  return response.send(user);
});

userRoutes.post('/', (request, response) => {
  const user = request.body;
  users.push(user);
  return response.send(user);
});

userRoutes.put('/:id', (request, response) => {
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

userRoutes.delete('/:id', (request, response) => {
  const { id } = request.params;
  users = users.filter((x) => x.id !== Number(id));
  return response.send('Deleted!');
});

export default userRoutes;
