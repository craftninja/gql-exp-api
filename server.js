const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();

const port = normalizePort(process.env.PORT || '3000');

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
