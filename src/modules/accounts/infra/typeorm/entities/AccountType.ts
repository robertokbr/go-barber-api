import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('account_types')
class AccountType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 512 })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AccountType;
