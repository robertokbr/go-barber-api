import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the available days from provider', async () => {
    const timeArray = Array.from({ length: 10 }, (_, index) => index + 8);

    await Promise.all(
      timeArray.map(hour =>
        fakeAppointmentsRepository.create({
          provider_id: 'provider',
          user_id: 'user',
          date: new Date(2021, 0, 1, hour, 0, 0),
        }),
      ),
    );

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 0, 2, 8, 0, 0),
    });

    const monthAvailability = await listProviderMonthAvailability.execute({
      provider_id: 'provider',
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
});
