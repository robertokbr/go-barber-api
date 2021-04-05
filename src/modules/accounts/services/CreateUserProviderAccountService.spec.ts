import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeAccountsRepository from '../repositories/fakes/FakeAccountsRepository';
import FakeUserProviderAccountsRepository from '../repositories/fakes/FakeUserProviderAccountsRepository';
import CreateUserProviderAccountService from './CreateUserProviderAccountService';

let createUserProviderAccount: CreateUserProviderAccountService;
let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let cacheProvider: FakeCacheProvider;
let accountsRepository: FakeAccountsRepository;
let userProviderAccountsRepository: FakeUserProviderAccountsRepository;

describe('CreateUserProviderAccountService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    cacheProvider = new FakeCacheProvider();
    accountsRepository = new FakeAccountsRepository();
    userProviderAccountsRepository = new FakeUserProviderAccountsRepository();
    createUserProviderAccount = new CreateUserProviderAccountService(
      usersRepository,
      hashProvider,
      cacheProvider,
      accountsRepository,
      userProviderAccountsRepository,
    );
  });

  it('Should be able to create a new user provider account', async () => {
    const user = await createUserProviderAccount.execute({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
      account_name: 'provider',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a account with a invalid account type name', async () => {
    await expect(
      createUserProviderAccount.execute({
        email: 'test@gmail.com',
        name: 'person',
        password: '123456',
        account_name: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new user with an already used email', async () => {
    await createUserProviderAccount.execute({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
      account_name: 'provider',
    });

    await expect(
      createUserProviderAccount.execute({
        email: 'test@gmail.com',
        name: 'person',
        password: '123456',
        account_name: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
