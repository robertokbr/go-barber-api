import Appointments from '../infra/typeorm/entities/Appointment';

export default interface IAppointements {
  findByDate(date: Date): Promise<Appointments | undefined>;
}
