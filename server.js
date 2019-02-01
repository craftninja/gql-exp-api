if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies, global-require
}

const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();

const port = normalizePort(process.env.PORT || '3000');

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); /* eslint-disable-line no-console */
});

function normalizePort(val) {
  const port = parseInt(val, 10); /* eslint-disable-line no-shadow */

  if (isNaN(port)) { /* eslint-disable-line no-restricted-globals */
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
