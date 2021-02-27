import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
  avatarfilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private diskStorageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarfilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      await this.diskStorageProvider.deleteFile(user.avatar);
    }

    const filename = await this.diskStorageProvider.saveFile(avatarfilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
