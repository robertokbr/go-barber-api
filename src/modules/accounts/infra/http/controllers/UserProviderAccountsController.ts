import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserProviderAccountService from '@modules/accounts/services/CreateUserProviderAccountService';
import { classToClass } from 'class-transformer';

class UserProviderAccountsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { account_name, email, name, password } = request.body;

    const createUserProviderAccount = container.resolve(
      CreateUserProviderAccountService,
    );

    const userProviderAccount = await createUserProviderAccount.execute({
      account_name,
      email,
      name,
      password,
    });

    return response.status(201).json(classToClass(userProviderAccount));
  }
}

export default UserProviderAccountsController;
