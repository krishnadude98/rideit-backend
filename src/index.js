import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config';
import routes from './routes';

let app = express();
app.server= http:createServer(app);




app.use('/v1',routes);

app.server.listen(config.port);
console.log(`started on port ${app.server.address().port}`);

export default app;
