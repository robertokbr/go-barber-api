import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import UserProviderAccount from '../infra/typeorm/entities/UserProviderAccount';
import IAccountsRepository from '../repositories/IAccountsRepository';
import IUserProviderAccountsRepository from '../repositories/IUserProviderAccountsRepository';

interface IRequest {
  account_name: string;
  name: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserProviderAccountService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('UserProviderAccountsRepository')
    private userProviderAccountsRepository: IUserProviderAccountsRepository,
  ) {}

  public async execute({
    account_name,
    name,
    password,
    email,
  }: IRequest): Promise<UserProviderAccount> {
    const accountType = await this.accountsRepository.findByName(account_name);

    if (!accountType) {
      throw new AppError('You must provide a valid account type name');
    }

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

    await this.cacheProvider.invalidatePrefix('providers-list');

    const userProviderAccount = await this.userProviderAccountsRepository.create(
      {
        account_type_id: accountType.id,
        user,
      },
    );

    userProviderAccount.userAccount.accountType = accountType;

    return userProviderAccount;
  }
}

export default CreateUserProviderAccountService;
