import config from './config/config';
import app from './app';
import { connect } from './db/connection';

connect().then(() => {
  app.listen(config.port, () => {
    console.log('app started');
  });
});
