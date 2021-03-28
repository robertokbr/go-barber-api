import AccountType from '../infra/typeorm/entities/AccountType';

export default interface IAccountsRepository {
  findByName(name: string): Promise<AccountType | undefined>;
}
