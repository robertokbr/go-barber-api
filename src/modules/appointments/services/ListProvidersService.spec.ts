import FakeUserProviderAccountsRepository from '@modules/accounts/repositories/fakes/FakeUserProviderAccountsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUserProviderAccountsRepository: FakeUserProviderAccountsRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserProviderAccountsRepository = new FakeUserProviderAccountsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUserProviderAccountsRepository,
      fakeCacheProvider,
    );
  });

  it('Should be able to list the providers', async () => {
    const provider = await fakeUsersRepository.create({
      email: 'test1@gmail.com',
      name: 'person',
      password: '123456',
    });

    await fakeUserProviderAccountsRepository.create({
      account_type_id: 1,
      user: provider,
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'test2@gmail.com',
      name: 'person2',
      password: '123456',
    });

    const listProvidersReturn = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(listProvidersReturn).toEqual([provider]);
  });
});
