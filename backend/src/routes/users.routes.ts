import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, password, email } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      password,
      email,
    });
    delete user.password;
    return response.json(user);
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.get('/', (request, response) => {
  return response.send('ola mundo');
});

export default usersRouter;
