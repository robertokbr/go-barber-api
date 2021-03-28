import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import AccountType from '@modules/accounts/infra/typeorm/entities/AccountType';

export default class CreateSeeds implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(AccountType)
      .values([
        {
          name: 'provider',
          description:
            'An account that allows the user to provide a service to another user',
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(AccountType)
      .values([
        {
          name: 'administrator',
          description:
            'An account that allows the user to create provider users teams',
        },
      ])
      .execute();
  }
}
