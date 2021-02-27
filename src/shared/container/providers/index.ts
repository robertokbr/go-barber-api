import { container } from 'tsyringe';
import FakeMailProvider from './MailProvider/fakes/FakeMailProvider';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailProvider>('MailProvider', FakeMailProvider);
