import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]>;
  create(date: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
