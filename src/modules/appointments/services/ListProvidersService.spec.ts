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
    const provider = await fakeUserProviderAccountsRepository.create({
      account_type_id: 1,
      user: {
        id: 'provider_id',
        email: 'test1@gmail.com',
        name: 'person',
        password: '123456',
      },
    });

    const user = await fakeUsersRepository.create({
      email: 'test2@gmail.com',
      name: 'person2',
      password: '123456',
    });

    const listProvidersReturn = await listProviders.execute({
      user_id: user.id,
    });

    expect(listProvidersReturn).toEqual([provider.userAccount.user]);
  });

  it('Should remove the user of the list if he is a provider', async () => {
    const provider = await fakeUserProviderAccountsRepository.create({
      account_type_id: 1,
      user: {
        id: 'provider_id',
        email: 'test1@gmail.com',
        name: 'person',
        password: '123456',
      },
    });

    const listProvidersReturn = await listProviders.execute({
      user_id: provider.userAccount.user.id,
    });

    expect(listProvidersReturn).toEqual([]);
  });
});
