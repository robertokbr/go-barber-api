import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('Should be able to authenticate the user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

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
});

describe('AuthenticateUser', () => {
  it('Should not be able to authenticate a non created user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'test@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

describe('AuthenticateUser', () => {
  it('Should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      email: 'test@gmail.com',
      password: '123456',
      name: 'person',
    });

    expect(
      authenticateUserService.execute({
        email: 'test@gmail.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
