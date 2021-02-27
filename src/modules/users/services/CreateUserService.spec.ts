import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with an already used email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    expect(
      createUserService.execute({
        email: 'test@gmail.com',
        name: 'person',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
