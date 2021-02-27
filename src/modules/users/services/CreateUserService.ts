import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  name: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, password, email }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email adress already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    return user;
  }
}
export default CreateUserService;
