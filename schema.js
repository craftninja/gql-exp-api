const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
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

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parentValue, args) {
        return (await query(
          `INSERT INTO "customers"(
            "name",
            "email",
            "age"
          ) values ($1, $2, $3) returning *`,
          [
            args.name,
            args.email,
            args.age,
          ],
        )).rows[0];
      },
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args) {
        return (await query(
          `DELETE FROM "customers"
          WHERE id = $1 returning *`,
          [
            args.id,
          ],
        )).rows[0];
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
