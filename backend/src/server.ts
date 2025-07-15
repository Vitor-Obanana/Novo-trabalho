import Fastify from 'fastify';
import cors from '@fastify/cors';
import productsRoutes from './routes/productsRoutes';
import coursesRoutes from './routes/Courses.Routes'; // Certifique-se que esse nome do arquivo esteja certo

const app = Fastify(); // Criar o app Fastify

// Configurar CORS
app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// Rota de teste
app.get('/test', async (request, reply) => {
  return { message: 'Teste OK' };
});

// Registrar rotas
app.register(productsRoutes, { prefix: '/products' });

// 👉 AQUI TIREI O PREFIXO para evitar /courses/courses
app.register(coursesRoutes);

// Iniciar o servidor
app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`✅ Servidor rodando em ${address}`);
});

