import fs from 'fs';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import { getUserId } from './utils';


const prisma = new PrismaClient({
    errorFormat: 'minimal',
});

const resolvers = {
    Query,
    Mutation,
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId: req && req.headers.authorization ? getUserId(req) : null,
        };
    },
});

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startServer().then(() => {
    app.listen({ port: 4000 }, () =>
        console.log(`Server is running on http://localhost:4000${server.graphqlPath}`)
    );
});