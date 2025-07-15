import { FastifyInstance } from 'fastify';
import { db as connection } from '../models/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Materia {
  id: number;
  nome: string;
  carga_horaria: number;
  descricao: string;
}

export async function materiaRoutes(fastify: FastifyInstance) {
  // LISTAR TODAS
  fastify.get('/materias', async (_, reply) => {
    try {
      const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM materias');
      return rows as Materia[];
    } catch (err) {
      return reply.code(500).send({ error: 'Erro ao buscar matérias' });
    }
  });

  // BUSCAR POR ID
  fastify.get('/materias/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM materias WHERE id = ?', [id]);
      const materias = rows as Materia[];
      if (materias.length === 0) return reply.code(404).send({ error: 'Matéria não encontrada' });
      return materias[0];
    } catch (err) {
      return reply.code(500).send({ error: 'Erro ao buscar matéria' });
    }
  });

  // CRIAR NOVA
  fastify.post('/materias', async (request, reply) => {
    const { nome, carga_horaria, descricao } = request.body as Partial<Materia>;

    if (!nome || !carga_horaria || !descricao) {
      return reply.code(400).send({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const [result] = await connection.execute<ResultSetHeader>(
        'INSERT INTO materias (nome, carga_horaria, descricao) VALUES (?, ?, ?)',
        [nome, carga_horaria, descricao]
      );
      return reply.code(201).send({ message: 'Matéria criada com sucesso', id: result.insertId });
    } catch (err) {
      return reply.code(500).send({ error: 'Erro ao criar matéria' });
    }
  });

  // ATUALIZAR
  fastify.put('/materias/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { nome, carga_horaria, descricao } = request.body as Partial<Materia>;

    if (!nome || !carga_horaria || !descricao) {
      return reply.code(400).send({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const [result] = await connection.execute<ResultSetHeader>(
        'UPDATE materias SET nome = ?, carga_horaria = ?, descricao = ? WHERE id = ?',
        [nome, carga_horaria, descricao, id]
      );

      if (result.affectedRows === 0) return reply.code(404).send({ error: 'Matéria não encontrada' });

      return { message: 'Matéria atualizada com sucesso' };
    } catch (err) {
      return reply.code(500).send({ error: 'Erro ao atualizar matéria' });
    }
  });

  // DELETAR
  fastify.delete('/materias/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const [result] = await connection.execute<ResultSetHeader>(
        'DELETE FROM materias WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0) return reply.code(404).send({ error: 'Matéria não encontrada' });

      return { message: 'Matéria deletada com sucesso' };
    } catch (err) {
      return reply.code(500).send({ error: 'Erro ao deletar matéria' });
    }
  });
}
