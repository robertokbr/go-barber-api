import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService.ts';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to updated user avatar', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarfilename: 'awesome_picture.png',
    });

    expect(user.avatar).toEqual('awesome_picture.png');
  });

  it('Should not be able to update avatar of a non created user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: '123456',
        avatarfilename: 'awesome_picture.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should delete old avatar when update new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarfilename: 'awesome_picture.png',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarfilename: 'awesome_picture2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('awesome_picture.png');
    expect(user.avatar).toEqual('awesome_picture2.png');
  });
});
