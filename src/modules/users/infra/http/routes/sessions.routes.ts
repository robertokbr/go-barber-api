import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticate = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticate.execute({
    password,
    email,
  });

  user.password = '';

  return response.json({ user, token });
});

export default sessionsRouter;
