if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies, global-require
}

if (!process.env.MIGRATE_TO) {
  process.env.MIGRATE_TO = 'max';
}

const path = require('path');
const Postgrator = require('postgrator');

const postgrator = new Postgrator({
  migrationDirectory: path.join(__dirname, '/migrations'),
  driver: 'pg',
  connectionString: process.env.DATABASE_URL,
  schemaTable: 'schemaversion',
});

postgrator.migrate(process.env.MIGRATE_TO, (err, migrations) => {
  /* eslint-disable no-console */
  if (err) {
    console.log(err);
  } else if (migrations) {
    console.log(['*******************']
      .concat(migrations.map(migration => `checking ${migration.filename}`))
      .join('\n'));
  }
  /* eslint-enable no-console */
  postgrator.endConnection(() => { });
});
