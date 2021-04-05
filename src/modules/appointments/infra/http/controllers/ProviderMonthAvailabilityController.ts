import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { month, year } = request.query;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const users = await listProviderMonthAvailability.execute({
      provider_user_id: provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(users);
  }
}

export default ProviderMonthAvailabilityController;
