import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAdmnistratorProvidersTeams1616880560848
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'administrator_provider_teams',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'user_administrator_id',
            type: 'int',
          },
          {
            name: 'user_provider_id',
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

    await queryRunner.createForeignKeys('administrator_provider_teams', [
      new TableForeignKey({
        name: 'administrator_provider_teams_relation',
        columnNames: ['user_administrator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_administrator_accounts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'provider_teams_administrator_relation',
        columnNames: ['user_provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_provider_accounts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'administrator_provider_teams',
      'administrator_provider_teams_relation',
    );
    await queryRunner.dropForeignKey(
      'administrator_provider_teams',
      'provider_teams_administrator_relation',
    );
    await queryRunner.dropTable('administrator_provider_teams');
  }
}
