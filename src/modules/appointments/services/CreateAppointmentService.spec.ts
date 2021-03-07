import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      user_id: 'user',
      provider_id: 'provider',
      date: new Date(2021, 0, 1, 13),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new appointment with user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        user_id: 'user',
        provider_id: 'user',
        date: new Date(2021, 0, 1, 13),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to create two appointments in the same date`, async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 12).getTime();
    });

    await createAppointmentService.execute({
      user_id: 'user',
      provider_id: 'provider',
      date: new Date(2021, 0, 1, 13),
    });

    await expect(
      createAppointmentService.execute({
        user_id: 'user',
        provider_id: 'provider',
        date: new Date(2021, 0, 1, 13),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to create appointments on a past date`, async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1).getTime();
    });

    await expect(
      createAppointmentService.execute({
        user_id: 'user',
        provider_id: 'provider',
        date: new Date(2020, 0, 1),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to create appointments out of time range 8am - 5pm`, async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1).getTime();
    });

    await expect(
      createAppointmentService.execute({
        user_id: 'user',
        provider_id: 'provider',
        date: new Date(2020, 0, 1, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
