import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserProviderAccountsRepository from '@modules/accounts/repositories/IUserProviderAccountsRepository';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_user_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('UserProviderAccountsRepository')
    private userProviderAccountsRepository: IUserProviderAccountsRepository,
  ) {}

  public async execute({
    provider_user_id,
    day,
    year,
    month,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_user_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      const provider = await this.userProviderAccountsRepository.findByUserId(
        provider_user_id,
      );

      if (!provider) {
        throw new AppError('User selected is not a provider');
      }

      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id: provider.id,
          day,
          year,
          month,
        },
      );

      await this.cacheProvider.save(cacheKey, classToClass(appointments));
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
