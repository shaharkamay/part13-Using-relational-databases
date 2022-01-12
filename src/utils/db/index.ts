import { Sequelize } from 'sequelize';
import Umzug, { UmzugOptions } from 'umzug';
import config from '../config';

const sequelize = new Sequelize(config.dbUrl, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const migrationConf: UmzugOptions = {
  storage: 'sequelize',
  storageOptions: { sequelize, tableName: 'migrations' },
  migrations: {
    params: [sequelize.getQueryInterface()],
    path: `${process.cwd()}/migrations`,
    pattern: /\.js$/,
  },
};

const connect = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Database connected successfully.');
  } catch (error) {
    console.log('Connecting database failed:', error);
    return process.exit(1);
  }
  return null;
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.file),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

export default sequelize;
export { connect, rollbackMigration };
