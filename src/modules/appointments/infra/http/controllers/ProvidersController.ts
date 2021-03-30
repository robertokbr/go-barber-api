import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const users = await listProviders.execute({ user_id });

    return response.json(classToClass(users));
  }
}

export default ProvidersController;
