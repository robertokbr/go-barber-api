import FakeUserProviderAccountsRepository from '@modules/accounts/repositories/fakes/FakeUserProviderAccountsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;
let fakeUserProviderAccountsRepository: FakeUserProviderAccountsRepository;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeUserProviderAccountsRepository = new FakeUserProviderAccountsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
      fakeUserProviderAccountsRepository,
    );
  });

  it('Should be able to list the provider appointments from a specific day', async () => {
    const provider = await fakeUserProviderAccountsRepository.create({
      account_type_id: 1,
      user: {
        id: 'provider_id',
        email: 'provider@gmail.com',
        name: 'provider',
        password: '123456',
      },
    });

    const appointmentOne = await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: provider.id,
      date: new Date(2021, 0, 1, 12, 0, 0),
    });

    const appointmentTwo = await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: provider.id,
      date: new Date(2021, 0, 1, 13, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      day: 1,
      month: 1,
      year: 2021,
      provider_user_id: provider.userAccount.user.id,
    });

    expect(appointments).toEqual([appointmentOne, appointmentTwo]);
  });

  it('should not be able to list appointments to a non provider user', async () => {
    await expect(
      listProviderAppointments.execute({
        day: 1,
        month: 1,
        year: 2021,
        provider_user_id: 'invalid_provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
