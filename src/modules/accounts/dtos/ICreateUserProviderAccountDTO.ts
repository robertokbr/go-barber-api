import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateUserProviderAccountDTO {
  account_type_id: number;
  user: User;
}
