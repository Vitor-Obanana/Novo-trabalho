import Fastify from 'fastify';
import cors from '@fastify/cors';
import productsRoutes from './routes/productsRoutes';

const fastify = Fastify({ logger: true });

fastify.register(cors, { origin: '*' });
fastify.register(productsRoutes, { prefix: '/products' });

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});

