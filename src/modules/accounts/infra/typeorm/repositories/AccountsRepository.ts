import { getRepository, Repository } from 'typeorm';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import AccountType from '../entities/AccountType';

class AccountsRepository implements IAccountsRepository {
  private ormRepository: Repository<AccountType>;

  constructor() {
    this.ormRepository = getRepository(AccountType);
  }

  public async findByName(name: string): Promise<AccountType | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }
}

export default AccountsRepository;
