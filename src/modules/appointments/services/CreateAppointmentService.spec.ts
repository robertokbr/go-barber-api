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
    const appointment = await createAppointmentService.execute({
      provider_id: '123123123',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it(`shouldn't be able to create two appointments in the same date`, async () => {
    const date = new Date();

    await createAppointmentService.execute({
      provider_id: '131313131',
      date,
    });

    expect(
      createAppointmentService.execute({
        provider_id: '131313131',
        date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
