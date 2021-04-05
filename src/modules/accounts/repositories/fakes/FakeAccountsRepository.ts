import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import AccountType from '@modules/accounts/infra/typeorm/entities/AccountType';

class FakeAccountsRepository implements IAccountsRepository {
  private accounts: AccountType[] = [];

  public async findByName(name: string): Promise<AccountType | undefined> {
    if (!name) return undefined;

    const accountType = new AccountType();

    Object.assign(accountType, {
      id: this.accounts.length + 1,
      name,
      description: name,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.accounts.push(accountType);

    return accountType;
  }
}

export default FakeAccountsRepository;
