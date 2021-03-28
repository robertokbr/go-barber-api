import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import UserAdministratorAccount from './UserAdministratorAccount';
import UserProviderAccount from './UserProviderAccount';

@Entity('administrator_provider_teams')
class AdmnistratorProviderTeam {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_administrator_id: number;

  @Column()
  user_provider_id: number;

  @ManyToOne(() => UserAdministratorAccount)
  @JoinColumn({ name: 'user_administrator_id' })
  userAdministratorAccount: UserAdministratorAccount;

  @ManyToOne(() => UserProviderAccount)
  @JoinColumn({ name: 'user_provider_id' })
  userProviderAccount: UserProviderAccount;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AdmnistratorProviderTeam;
