import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to updated user profile data', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    await updateProfileService.execute({
      user_id: user.id,
      email: 'test2@gmail.com',
      name: 'person2',
      password: '654321',
      old_password: '123456',
    });

    expect(user.name).toEqual('person2');
    expect(user.email).toEqual('test2@gmail.com');
  });

  it('Should not be able to updated e-mail using an "already in use" e-mail', async () => {
    const userOne = await fakeUsersRepository.create({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    await fakeUsersRepository.create({
      email: 'test2@gmail.com',
      name: 'person',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: userOne.id,
        email: 'test2@gmail.com',
        name: 'person2',
        password: '654321',
        old_password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update user password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    await updateProfileService.execute({
      user_id: user.id,
      email: 'test@gmail.com',
      name: 'person',
      old_password: '123456',
      password: '654321',
    });

    expect(user.password).toBe('654321');
  });

  it('Should not be able to update user password without old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'test@gmail.com',
        name: 'person',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update user password with a invalid old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'test@gmail.com',
        name: 'person',
        old_password: 'invalid-password',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update a non created user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'invalid_id',
        email: 'test@gmail.com',
        name: 'person',
        old_password: 'invalid-password',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
