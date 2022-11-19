import { GraphQLClient } from 'graphql-request';

export const createFaunaClient = (region: 'eu' | 'us') =>
  new GraphQLClient(`https://graphql.${region}.fauna.com/graphql`, {
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_KEY}`,
    },
  });
