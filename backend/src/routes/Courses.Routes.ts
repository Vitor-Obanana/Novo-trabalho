import { FastifyInstance } from 'fastify';
import { db } from '../models/db';

export default async function coursesRoutes(fastify: FastifyInstance) {
  fastify.get('/courses', async (request, reply) => {
    const [rows] = await db.query('SELECT * FROM courses');
    return rows;
  });

  fastify.post('/courses', async (request, reply) => {
    const { name, price, stock } = request.body as any;
    await db.query('INSERT INTO courses (name, price, stock) VALUES (?, ?, ?)', [name, price, stock]);
    reply.code(201).send({ message: 'Curso criado com sucesso' });
  });

  fastify.delete('/courses/:id', async (request, reply) => {
    const { id } = request.params as any;
    await db.query('DELETE FROM courses WHERE id = ?', [id]);
    reply.send({ message: 'Curso deletado' });
  });

  fastify.put('/courses/:id', async (request, reply) => {
    const { id } = request.params as any;
    const { name, price, stock } = request.body as any;
    await db.query('UPDATE courses SET name = ?, price = ?, stock = ? WHERE id = ?', [name, price, stock, id]);
    reply.send({ message: 'Curso atualizado' });
  });
}
