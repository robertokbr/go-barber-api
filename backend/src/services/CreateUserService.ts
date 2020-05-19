import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {
  public async execute({ name, password, email }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw new Error('Email adress already used.');
    }
    const user = usersRepository.create({
      name,
      password,
      email,
    });
    await usersRepository.save(user);
    return user;
  }
}
export default CreateUserService;
