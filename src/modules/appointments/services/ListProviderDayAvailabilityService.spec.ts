import FakeUserProviderAccountsRepository from '@modules/accounts/repositories/fakes/FakeUserProviderAccountsRepository';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUserProviderAccountsRepository: FakeUserProviderAccountsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeUserProviderAccountsRepository = new FakeUserProviderAccountsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
      fakeUserProviderAccountsRepository,
    );
  });

  it('Should be able to list the available time from provider', async () => {
    const timeArray = Array.from({ length: 7 }, (_, index) => index + 8);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 15).getTime();
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

    const DayAvailability = await listProviderDayAvailability.execute({
      provider_user_id: provider.userAccount.user.id,
      day: 1,
      month: 1,
      year: 2021,
    });

    expect(DayAvailability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ]),
    );
  });

  it('should not be able to list availability to a non provider user', async () => {
    await expect(
      listProviderDayAvailability.execute({
        day: 1,
        month: 1,
        year: 2021,
        provider_user_id: 'invalid_provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
