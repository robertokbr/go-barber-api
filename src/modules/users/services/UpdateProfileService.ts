import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    email,
    name,
    password,
    old_password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User need to be logged to update data');
    }

    const userWithProvidedEmail = await this.usersRepository.findByEmail(email);

    if (userWithProvidedEmail && userWithProvidedEmail.id !== user.id) {
      throw new AppError('Email already in use');
    }

    user.name = name;
    user.email = email;

    if (password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password!,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError(
          'You must provide a valid "old password" to update your password',
        );
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
