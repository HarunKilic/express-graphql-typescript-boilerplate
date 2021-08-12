import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers';
import { buildSchema } from 'type-graphql';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './middlewares/errors/not-found-error';

import app from './app';

const main = async () => {
  const schema = await buildSchema({
    resolvers,
  });

  const graphqlServer = new ApolloServer({
    schema,
  });

  await graphqlServer.start();

  graphqlServer.applyMiddleware({
    app,
  });
  app.all('*', async (req, res) => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  const PORT = process.env.PORT || 4444;

  await new Promise((resolve) =>
    app.listen(PORT, (): void => {
      console.log(
        '\x1b[36m%s\x1b[0m', // eslint-disable-line
        `🌏 Express server started at http://localhost:${PORT}`,
      );
      console.log(
        `🚀 Graphql ready at HTTP port http://localhost:${PORT}${graphqlServer.graphqlPath}`,
      );
      resolve;
    }),
  );
  return { graphqlServer, app };
};

main().catch(console.error);
