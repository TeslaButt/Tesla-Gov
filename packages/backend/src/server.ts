import Fastify from 'fastify';
import { proposalRoutes } from './routes';

const server = Fastify({
  logger: true,
});

// Register routes
server.register(proposalRoutes, { prefix: '/api' });

const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' });
    console.log(`Tesla-Gov backend listening at http://localhost:3001`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
