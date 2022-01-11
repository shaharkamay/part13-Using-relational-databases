import { Sequelize } from 'sequelize';
import config from '../config/config';

const sequelize = new Sequelize(config.dbUrl, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.log('Connecting database failed:', error);
    return process.exit(1);
  }
  return null;
};

export default sequelize;
export { connect };
