/* eslint-disable no-bitwise */
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import IUserProviderAccountsRepository from '@modules/accounts/repositories/IUserProviderAccountsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UserProviderAccountsRepository')
    private userProviderAccountsRepository: IUserProviderAccountsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      const userProviderAccounts = await this.userProviderAccountsRepository.find();

      users = userProviderAccounts.map(
        userProviderAccount => userProviderAccount.userAccount.user,
      );

      const userIsProvider = users.findIndex(user => user.id === user_id);

      if (~userIsProvider) {
        users.splice(userIsProvider, 1);
      }

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users),
      );
    }

    return users;
  }
}

export default ListProvidersService;
