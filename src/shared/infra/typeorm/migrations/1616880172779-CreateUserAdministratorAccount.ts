import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateUserAdministratorAccount1616880172779
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_administrator_accounts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'account_type_id',
            type: 'int',
          },
          {
            name: 'user_account_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('user_administrator_accounts', [
      new TableForeignKey({
        name: 'user_administrator_account_relation',
        columnNames: ['user_account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_accounts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'user_administrator_account_type_relation',
        columnNames: ['account_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'account_types',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'user_administrator_accounts',
      'user_administrator_account_relation',
    );
    await queryRunner.dropForeignKey(
      'user_administrator_accounts',
      'user_administrator_account_type_relation',
    );
    await queryRunner.dropTable('user_administrator_accounts');
  }
}
