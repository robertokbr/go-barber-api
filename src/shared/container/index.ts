import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IAppointementsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import IUserProviderAccountsRepository from '@modules/accounts/repositories/IUserProviderAccountsRepository';
import UserProviderAccountsRepository from '@modules/accounts/infra/typeorm/repositories/UserProviderAccountsRepository';
import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import AccountsRepository from '@modules/accounts/infra/typeorm/repositories/AccountsRepository';

// Appointments
container.registerSingleton<IAppointementsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

// Users
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

// Notifications
container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

// Accounts
container.register<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);

container.register<IUserProviderAccountsRepository>(
  'UserProviderAccountsRepository',
  UserProviderAccountsRepository,
);
