import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

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
      throw new AppError('Email adress already used.');
    }
    const hashedPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      password: hashedPassword,
      email,
    });
    await usersRepository.save(user);
    return user;
  }
}
export default CreateUserService;
