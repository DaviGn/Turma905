import { Router } from 'express';

// Mapeamento as rotas
// /users
const userRoutes = Router();

let users: any[] = [];

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

userRoutes.get('/', (request, response) => {
  return response.send(users);
});

userRoutes.get('/:id', (request, response) => {
  const { id } = request.params;
  const user = users.find((x) => x.id === Number(id));

  if (!user) {
    return response.status(404).send({
      message: 'User not found!',
    });
  }

  return response.send(user);
});

userRoutes.post('/', (request, response) => {
  const user = request.body;

  if (!user.id) {
    return response.status(400).send({
      field: 'id',
      message: 'Id is invalid!',
    });
  }

  if (!user.name) {
    return response.status(400).send({
      field: 'name',
      message: 'Name is invalid!',
    });
  }

  if (!user.email || !emailRegex.test(user.email)) {
    return response.status(400).send({
      field: 'email',
      message: 'E-mail is invalid!',
    });
  }

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
