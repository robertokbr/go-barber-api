import ICreateUserProviderAccountDTO from '../dtos/ICreateUserProviderAccountDTO';
import UserProviderAccount from '../infra/typeorm/entities/UserProviderAccount';

export default interface IUserProviderAccountsRepository {
  create(data: ICreateUserProviderAccountDTO): Promise<UserProviderAccount>;
  findByUserId(user_id: string): Promise<UserProviderAccount | undefined>;
  find(): Promise<UserProviderAccount[]>;
}
