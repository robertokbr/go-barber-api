import { container } from 'tsyringe';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import HandlebarsMailTemplateProvier from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

const mailProviders = {
  Ethereal: EtherealMailProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvier,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(mailProviders.Ethereal),
);
