import FakeUserProviderAccountsRepository from '@modules/accounts/repositories/fakes/FakeUserProviderAccountsRepository';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeUserProviderAccountsRepository: FakeUserProviderAccountsRepository;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeUserProviderAccountsRepository = new FakeUserProviderAccountsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
      fakeUserProviderAccountsRepository,
    );
  });

  it('Should be able to list the available days from provider', async () => {
    const timeArray = Array.from({ length: 10 }, (_, index) => index + 8);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1).getTime();
    });

    const provider = await fakeUserProviderAccountsRepository.create({
      account_type_id: 1,
      user: {
        id: 'provider_id',
        email: 'provider@gmail.com',
        name: 'provider',
        password: '123456',
      },
    });

    await Promise.all(
      timeArray.map(hour =>
        fakeAppointmentsRepository.create({
          provider_id: provider.id,
          user_id: 'user',
          date: new Date(2021, 0, 1, hour, 0, 0),
        }),
      ),
    );

    await fakeAppointmentsRepository.create({
      provider_id: provider.id,
      user_id: 'user',
      date: new Date(2021, 0, 2, 8, 0, 0),
    });

    const monthAvailability = await listProviderMonthAvailability.execute({
      provider_user_id: provider.userAccount.user.id,
      month: 1,
      year: 2021,
    });

    expect(monthAvailability).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: true },
        { day: 3, available: true },
        { day: 4, available: true },
      ]),
    );
  });

  it('should not be able to list availability to a non provider user', async () => {
    await expect(
      listProviderMonthAvailability.execute({
        month: 1,
        year: 2021,
        provider_user_id: 'invalid_provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
