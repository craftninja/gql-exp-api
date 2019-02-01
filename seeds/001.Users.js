if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies, global-require
}

const { query } = require('../db/index');
const clearDB = require('../lib/clearDB');

clearDB().then(async () => {
  const beyonce = (await query(
    `INSERT INTO "customers"(
      "name",
      "email",
      "age"
    ) values ($1, $2, $3) returning *`,
    [
      'Beyoncé Knowles-Carter',
      'beyonce@example.com',
      38,
    ],
  )).rows[0];

  const rachel = (await query(
    `INSERT INTO "customers"(
      "name",
      "email",
      "age"
    ) values ($1, $2, $3) returning *`,
    [
      'Rachel Cargle',
      'rachel@example.com',
      32,
    ],
  )).rows[0];

  const laverne = (await query(
    `INSERT INTO "customers"(
      "name",
      "email",
      "age"
    ) values ($1, $2, $3) returning *`,
    [
      'Laverne Cox',
      'laverne@example.com',
      46,
    ],
  )).rows[0];

  /* eslint-disable no-console */
  console.log(`Created customer ${beyonce.name}`);
  console.log(`Created customer ${rachel.name}`);
  console.log(`Created customer ${laverne.name}`);
  /* eslint-enable no-console */
  await process.exit();
});
