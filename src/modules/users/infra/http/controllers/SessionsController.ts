import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticate = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticate.execute({
      password,
      email,
    });

    user.password = '';

    return response.json({ user, token });
  }
}

export default SessionsController;
