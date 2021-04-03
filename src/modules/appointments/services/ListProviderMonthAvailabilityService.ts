import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import IUserProviderAccountsRepository from '@modules/accounts/repositories/IUserProviderAccountsRepository';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UserProviderAccountsRepository')
    private userProviderAccountsRepository: IUserProviderAccountsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const provider = await this.userProviderAccountsRepository.findByUserId(
      provider_id,
    );

    if (!provider) {
      throw new AppError('User selected is not a provider');
    }

    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider_id: provider.id, month, year },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const today = new Date(Date.now());

    const availabilityArray = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsOnDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      return {
        day,
        available: isAfter(compareDate, today) && appointmentsOnDay.length < 10,
      };
    });

    return availabilityArray;
  }
}

export default ListProviderMonthAvailabilityService;
