import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the available time from provider', async () => {
    const timeArray = Array.from({ length: 7 }, (_, index) => index + 8);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 15).getTime();
    });

    await Promise.all(
      timeArray.map(hour =>
        fakeAppointmentsRepository.create({
          user_id: 'user',
          provider_id: 'provider',
          date: new Date(2021, 0, 1, hour, 0, 0),
        }),
      ),
    );

    const DayAvailability = await listProviderDayAvailability.execute({
      provider_id: 'provider',
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
});
