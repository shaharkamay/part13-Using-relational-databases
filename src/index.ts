import config from './utils/config/config';
import app from './app';
import { connect } from './utils/db/connection';

(async () => {
  await connect();
  app.listen(config.port, () => {
    console.log('app started');
  });
})();
