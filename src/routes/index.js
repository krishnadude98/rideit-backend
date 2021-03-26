import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import restaurant from '../controller/share';

let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/share', restaurant({ config, db }));
});

export default router;
