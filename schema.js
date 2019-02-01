const {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');
const { query } = require('./db/index');

const CustomerType = new GraphQLObjectType({
  name: 'CustomerType',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const customers = (async () => (await query('SELECT * FROM "customers"')).rows)();

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        return (await query('SELECT * FROM "customers" WHERE "id" = $1 LIMIT 1', [
          args.id,
        ])).rows[0];
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      async resolve() {
        return (await query('SELECT * FROM "customers"')).rows;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
