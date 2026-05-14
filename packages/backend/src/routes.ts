import { FastifyInstance } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';

// Load mock DB
const dbPath = path.resolve(__dirname, 'db.json');
const getDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));

export async function proposalRoutes(fastify: FastifyInstance) {
  fastify.get('/proposals', async (request, reply) => {
    const db = getDb();
    return db.proposals;
  });

  fastify.get('/proposals/:id', async (request: any, reply) => {
    const { id } = request.params;
    const db = getDb();
    const proposal = db.proposals.find((p: any) => p.id === id);
    if (!proposal) {
      return reply.status(404).send({ error: 'Proposal not found' });
    }
    return proposal;
  });
}
