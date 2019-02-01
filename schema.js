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
      resolve(parentValue, args) {
        return customers.find(customer => customer.id === args.id);
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve() {
        return customers;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
