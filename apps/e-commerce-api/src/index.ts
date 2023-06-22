import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ApolloServer, gql } from 'apollo-server-express';

const app = require('express')();
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const typeDefs = gql`
  scalar Date

  type Suppliers {
    address: String
    zipCode: String
    city: String
    country: String
    email: String
    id: ID!
    name: String
    phone: String
    website: String
    notes: String
    status: Boolean
    createdAt: Date!
    updatedAt: Date!
  }

  type Customer {
    id: String!
    address: String
    zipCode: String
    city: String
    country: String
    birthday: Date!
    creditCardExpMonth: Int
    creditCardExpYear: Int
    creditCardNumber: Int
    email: String
    gender: String
    name: String
    phoneNumber: String
    notifications: Boolean
    shipAddress: String
    shipCity: String
    shipCountry: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    suppliers: [Suppliers]
    customer(id: String!): Customer
  }
`;

const resolvers = {
  Query: {
    suppliers: async () => {
      const snapshot = await admin.firestore().collection('Suppliers').get();
      return snapshot.docs.map((doc) => doc.data());
    },
    customer: async (parent: any, args: { id: string }, context: any, info: any) => {
      const snapshot = await admin.firestore().collection('Customers').doc(args.id).get();
      return snapshot.data();
    },
  },
};

startApolloServer(typeDefs, resolvers);
async function startApolloServer(typeDefs: any, resolvers: any) {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/', cors: true });
}


export const apiGraphql = functions.https.onRequest(app);
