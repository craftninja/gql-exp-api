const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const CustomerType = new GraphQLObjectType({
  name: 'CustomerType',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
})

const customers = [
  {id: '1', name: 'Aziz Zamboni', email: 'aziz@example.com', age: 57},
  {id: '2', name: 'Beatrice Yolanda', email: 'beatrice@example.com', age: 37},
  {id: '3', name: 'Chanel Xerxes', email: 'chanel@example.com', age: 27},
]

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        return customers.find((customer) => customer.id === args.id)﻿
      },
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
