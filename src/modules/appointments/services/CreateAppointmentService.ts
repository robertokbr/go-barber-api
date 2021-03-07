import 'reflect-metadata';
import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointementsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  user_id: string;
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  private appointmentsRepository: IAppointementsRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointementsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({
    provider_id,
    date,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (isBefore(appointmentDate, new Date(Date.now()))) {
      throw new AppError("You can't create appointments in a past Date!");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create a appointment with yourself!");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You can't create an appointment out of the time range!",
      );
    }

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked!');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
