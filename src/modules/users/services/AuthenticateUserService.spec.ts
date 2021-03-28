import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to authenticate the user', async () => {
    await createUserService.execute({
      email: 'test@gmail.com',
      password: '123456',
      name: 'person',
    });

    const response = await authenticateUserService.execute({
      email: 'test@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('Should not be able to authenticate a non created user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'test@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      email: 'test@gmail.com',
      password: '123456',
      name: 'person',
    });

    await expect(
      authenticateUserService.execute({
        email: 'test@gmail.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
