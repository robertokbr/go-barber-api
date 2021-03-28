import { Router } from 'express';

import UserProviderAccountsController from '../controllers/UserProviderAccountsController';

const providerAccounts = Router();
const userProviderAccountsController = new UserProviderAccountsController();

providerAccounts.post('/providers', userProviderAccountsController.create);

export default providerAccounts;
