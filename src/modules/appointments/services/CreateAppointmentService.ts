import 'reflect-metadata';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserProviderAccountsRepository from '@modules/accounts/repositories/IUserProviderAccountsRepository';
import IAppointementsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  user_id: string;
  provider_user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointementsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('UserProviderAccountsRepository')
    private userProviderAccountsRepository: IUserProviderAccountsRepository,
  ) {}

  public async execute({
    provider_user_id,
    date,
    user_id,
  }: IRequest): Promise<Appointment> {
    if (user_id === provider_user_id) {
      throw new AppError("You can't create a appointment with yourself!");
    }

    const provider = await this.userProviderAccountsRepository.findByUserId(
      provider_user_id,
    );

    if (!provider) {
      throw new AppError('User selected is not a provider');
    }

    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, new Date(Date.now()))) {
      throw new AppError("You can't create appointments in a past Date!");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You can't create an appointment out of the time range!",
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider.id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked!');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id: provider.id,
      date: appointmentDate,
      user_id,
    });

    const formatedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_user_id,
      content: `Novo agendamento para o dia ${formatedDate}`,
    });

    const cacheKeyProvider = `provider-appointments:${provider_user_id}:${format(
      appointmentDate,
      'yyyy-M-d',
    )}`;

    const cacheKeyUser = `user-appointments:${user_id}`;

    await Promise.all([
      this.cacheProvider.invalidate(cacheKeyProvider),
      this.cacheProvider.invalidate(cacheKeyUser),
    ]);

    return appointment;
  }
}

export default CreateAppointmentService;
