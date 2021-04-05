import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IUserProviderAccountsRepository from '@modules/accounts/repositories/IUserProviderAccountsRepository';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_user_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailability {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UserProviderAccountsRepository')
    private userProviderAccountsRepository: IUserProviderAccountsRepository,
  ) {}

  public async execute({
    provider_user_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const provider = await this.userProviderAccountsRepository.findByUserId(
      provider_user_id,
    );

    if (!provider) {
      throw new AppError('User selected is not a provider');
    }

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { provider_id: provider.id, year, month, day },
    );

    const currentDate = new Date(Date.now());

    const eachHourArray = Array.from({ length: 10 }, (_, index) => index + 8);

    const availabilityArray = eachHourArray.map(hour => {
      const appointmentOnHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !appointmentOnHour && isAfter(compareDate, currentDate),
      };
    });

    return availabilityArray;
  }
}

export default ListProviderDayAvailability;
