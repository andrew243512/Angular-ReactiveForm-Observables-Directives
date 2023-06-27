import { ValidationError, ApolloError } from 'apollo-server';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';

const app = require('express')();
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
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
  Mutation: {
    async signUp(_: null, args: { name: string; email: string; password: string; phone: string }) {
      try {
        const user = await admin.auth().createUser({
          email: args.email,
          password: args.password,
          emailVerified: false,
          phoneNumber: args.phone,
          displayName: args.name,
          photoURL: 'http://www.example.com/12345678/photo.png',
          disabled: false,
        });

        const muts = await admin.firestore().collection('Customers').doc(user.uid).set({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        console.log('muts', muts);

        return (
          { id: user.uid, email: user.email, displayName: user.displayName } ||
          new ValidationError('User not created')
        );
      } catch (error: any) {
        throw new ApolloError(error);
      }
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
