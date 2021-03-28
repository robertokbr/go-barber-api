import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with an already used email', async () => {
    await createUserService.execute({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        email: 'test@gmail.com',
        name: 'person',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
