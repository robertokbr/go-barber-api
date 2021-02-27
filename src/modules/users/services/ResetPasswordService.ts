import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<any> {
    const findToken = await this.userTokensRepository.findByToken(token);

    if (!findToken) {
      throw new AppError('User Token does not exists');
    }

    const user = await this.usersRepository.findById(findToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = findToken.created_at;
    const timeRange = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), timeRange)) {
      throw new AppError('Token is out of the date range');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
