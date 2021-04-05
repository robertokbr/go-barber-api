import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserProviderAccountsRepository from '@modules/accounts/repositories/fakes/FakeUserProviderAccountsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;
let fakeUserProviderAccountsRepository: FakeUserProviderAccountsRepository;

describe('CreateAfakeCacheProviderfakeCacheProviderfakeCacheProviderppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeUserProviderAccountsRepository = new FakeUserProviderAccountsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
      fakeUserProviderAccountsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 12).getTime();
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

    const appointment = await createAppointmentService.execute({
      user_id: 'user',
      provider_user_id: provider.userAccount.user.id,
      date: new Date(2021, 0, 1, 13),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create an appointment with a non provider user', async () => {
    await expect(
      createAppointmentService.execute({
        user_id: 'user',
        provider_user_id: 'invalid_provider_id',
        date: new Date(2021, 0, 1, 13),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment with user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1).getTime();
    });

    const provider = await fakeUserProviderAccountsRepository.create({
      account_type_id: 1,
      user: {
        id: 'user',
        email: 'provider@gmail.com',
        name: 'provider',
        password: '123456',
      },
    });

    await expect(
      createAppointmentService.execute({
        user_id: 'user',
        provider_user_id: provider.userAccount.user.id,
        date: new Date(2021, 0, 1),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to create two appointments in the same time`, async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 0, 1, 12).getTime();
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

    await createAppointmentService.execute({
      user_id: 'user',
      provider_user_id: provider.userAccount.user.id,
      date: new Date(2021, 0, 1, 12),
    });

    await expect(
      createAppointmentService.execute({
        user_id: 'user',
        provider_user_id: provider.userAccount.user.id,
        date: new Date(2021, 0, 1, 12),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to create appointments on a past date`, async () => {
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

    await expect(
      createAppointmentService.execute({
        user_id: 'user',
        provider_user_id: provider.userAccount.user.id,
        date: new Date(2020, 0, 1),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to create appointments out of time range 8am - 5pm`, async () => {
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

    await expect(
      createAppointmentService.execute({
        user_id: 'user',
        provider_user_id: provider.userAccount.user.id,
        date: new Date(2021, 0, 1, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
