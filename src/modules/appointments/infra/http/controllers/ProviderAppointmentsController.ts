import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, year, month } = request.query;

    const provider_id = request.user.id;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      year: Number(year),
      month: Number(month),
    });

    return response.json(classToClass(appointments));
  }
}

export default ProviderAppointmentsController;
