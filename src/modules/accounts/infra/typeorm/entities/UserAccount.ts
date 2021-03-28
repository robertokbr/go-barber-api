import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import AccountType from './AccountType';
import UserProviderAccount from './UserProviderAccount';
import UserAdministratorAccount from './UserAdministratorAccount';

@Entity('user_accounts')
class UserAccount {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  account_type_id: number;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => AccountType)
  @JoinColumn({ name: 'account_type_id' })
  accountType: AccountType;

  @ManyToOne(() => User, { eager: true, cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(
    () => UserProviderAccount,
    userProviderAccount => userProviderAccount.userAccount,
  )
  userProviderAccount: UserProviderAccount;

  @OneToOne(
    () => UserAdministratorAccount,
    userAdmnistratorAccount => userAdmnistratorAccount.userAccount,
  )
  userAdministratorAccount: UserAdministratorAccount;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserAccount;
