import ICreateUserDTO from '../dto/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(date: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

// Separate the method per responsability to be more understandble
// find by email => findOne()
// create and save ==> create()
// find by id => findOne()
// update user => user()
