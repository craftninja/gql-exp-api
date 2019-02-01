if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

if (!process.env.MIGRATE_TO) {
  process.env.MIGRATE_TO = 'max';
}

const Postgrator = require('postgrator')
const postgrator = new Postgrator({
  migrationDirectory: __dirname + '/migrations',
  driver: 'pg',
  connectionString: process.env.DATABASE_URL,
  schemaTable: 'schemaversion'
})

postgrator.migrate(process.env.MIGRATE_TO, (err, migrations) => {
  if (err) {
    console.log(err);
  } else if (migrations) {
    console.log(['*******************']
      .concat(migrations.map(migration => `checking ${migration.filename}`))
      .join('\n'));
  }
  postgrator.endConnection(() => { });
});
