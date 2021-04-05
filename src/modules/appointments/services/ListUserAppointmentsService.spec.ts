import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListUserAppointmentsService from './ListUserAppointmentsService';

let listUserAppointments: ListUserAppointmentsService;
let appointmentsRepository: FakeAppointmentsRepository;
let cacheProvider: FakeCacheProvider;

describe('ListUserAppointmentsService', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    cacheProvider = new FakeCacheProvider();
    listUserAppointments = new ListUserAppointmentsService(
      appointmentsRepository,
      cacheProvider,
    );
  });

  it('Sould be able to list the user appointments', async () => {
    const appointment = await appointmentsRepository.create({
      date: new Date(),
      provider_id: 1,
      user_id: 'user_id',
    });

    const listUserAppointmentsReturn = await listUserAppointments.execute({
      user_id: 'user_id',
    });

    expect(listUserAppointmentsReturn).toEqual([appointment]);
  });
});
