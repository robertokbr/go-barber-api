import ICreateUserProviderAccountDTO from '../dtos/ICreateUserProviderAccountDTO';
import UserProviderAccount from '../infra/typeorm/entities/UserProviderAccount';

export default interface IUserProviderAccountsRepository {
  create(data: ICreateUserProviderAccountDTO): Promise<UserProviderAccount>;
  find(): Promise<UserProviderAccount[]>;
}
