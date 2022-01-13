import config from './utils/config';
import app from './app';
import { connect } from './utils/db';

(async () => {
  await connect();
  app.listen(config.port, () => {
    console.log('app started');
  });
})();
