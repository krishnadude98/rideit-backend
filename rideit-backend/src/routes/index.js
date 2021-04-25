import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import share from '../controller/share';
import rentrider from '../controller/rentrider';
import rentride from '../controller/rentride';
import account from '../controller/account';
let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/share', share({ config, db }));
  router.use('/rentrider', rentrider({ config, db }));
  router.use('/rentride', rentride({ config, db }));
  router.use('/account', account({ config, db }));
});

export default router;
