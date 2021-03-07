import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('Should be able to list the providers', async () => {
    const userOne = await fakeUsersRepository.create({
      email: 'test1@gmail.com',
      name: 'person1',
      password: '123456',
    });

    const userTwo = await fakeUsersRepository.create({
      email: 'test2@gmail.com',
      name: 'person2',
      password: '123456',
    });

    const providers = [userOne, userTwo];

    const loggedUser = await fakeUsersRepository.create({
      email: 'test3@gmail.com',
      name: 'person3',
      password: '123456',
    });

    const listProvidersReturn = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(listProvidersReturn).toEqual(providers);
  });
});
