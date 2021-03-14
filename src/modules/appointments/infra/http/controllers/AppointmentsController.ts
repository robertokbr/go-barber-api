import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const { id } = request.user;

    const CreateAppointment = container.resolve(CreateAppointmentService);

    const appointment = await CreateAppointment.execute({
      provider_id,
      date,
      user_id: id,
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
