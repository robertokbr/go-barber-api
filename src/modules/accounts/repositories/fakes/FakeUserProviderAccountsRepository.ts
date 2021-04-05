import ICreateUserProviderAccountDTO from '@modules/accounts/dtos/ICreateUserProviderAccountDTO';
import IUserProviderAccountsRepository from '@modules/accounts/repositories/IUserProviderAccountsRepository';
import UserProviderAccount from '@modules/accounts/infra/typeorm/entities/UserProviderAccount';

class FakeUserProviderAccountsRepository
  implements IUserProviderAccountsRepository {
  private userProviderAccounts: UserProviderAccount[] = [];

  public async create({
    account_type_id,
    user,
  }: ICreateUserProviderAccountDTO): Promise<UserProviderAccount> {
    const userProviderAccount = new UserProviderAccount();

    Object.assign(userProviderAccount, {
      id: this.userProviderAccounts.length + 1,
      account_type_id,
      userAccount: {
        account_type_id,
        user,
      },
    });

    this.userProviderAccounts.push(userProviderAccount);

    return userProviderAccount;
  }

  public async find(): Promise<UserProviderAccount[]> {
    return this.userProviderAccounts;
  }

  public async findByUserId(
    user_id: string,
  ): Promise<UserProviderAccount | undefined> {
    return this.userProviderAccounts.find(
      provider => provider.userAccount.user.id === user_id,
    );
  }
}

export default FakeUserProviderAccountsRepository;
