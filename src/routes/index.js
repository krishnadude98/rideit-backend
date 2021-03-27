import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import share from '../controller/share';
import rentrider from '../controller/rentrider'
let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/share', share({ config, db }));
  router.use('/rentrider', rentrider({ config, db }));

});

export default router;
