import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('Should be able to show user profile data', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@gmail.com',
      name: 'person',
      password: '123456',
    });

    const serviceReturn = await showProfileService.execute({
      user_id: user.id,
    });

    expect(serviceReturn).toBe(user);
  });

  it('Should not be able to show the profile from a non created user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
