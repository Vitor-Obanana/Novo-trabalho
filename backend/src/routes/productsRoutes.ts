import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../models/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';


interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id?: number | null;
}

export default async function productsRoutes(fastify: FastifyInstance) {
  // Criar produto
  fastify.post('/', async (request: FastifyRequest<{ Body: Product }>, reply: FastifyReply) => {
    const { name, description, price, stock, category_id } = request.body;

    if (!name || price == null || stock == null) {
      return reply.status(400).send({ error: 'Campos obrigatórios: name, price, stock' });
    }

    try {
      const [result] = await db.execute<ResultSetHeader>(
        `INSERT INTO products (name, description, price, stock, category_id)
         VALUES (?, ?, ?, ?, ?)`,
        [name, description || null, price, stock, category_id || null]
      );

      const insertId = result.insertId;
      const [rows] = await db.execute<RowDataPacket[]>(
        'SELECT * FROM products WHERE id = ?',
        [insertId]
      );

      return reply.status(201).send(rows[0]);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao criar produto' });
    }
  });

  // Listar produtos com filtros
  fastify.get('/', async (request: FastifyRequest<{ Querystring: { category_id?: string; name?: string } }>, reply: FastifyReply) => {
    const { category_id, name } = request.query;
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];

    if (category_id) {
      sql += ' AND category_id = ?';
      params.push(category_id);
    }

    if (name) {
      sql += ' AND name LIKE ?';
      params.push(`%${name}%`);
    }

    try {
      const [rows] = await db.execute<RowDataPacket[]>(sql, params);
      return reply.send(rows);
    } catch {
      return reply.status(500).send({ error: 'Erro ao buscar produtos' });
    }
  });

  // Buscar produto por ID
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const id = Number(request.params.id);
    try {
      const [rows] = await db.execute<RowDataPacket[]>(
        'SELECT * FROM products WHERE id = ?',
        [id]
      );
      if (rows.length === 0) {
        return reply.status(404).send({ error: 'Produto não encontrado' });
      }
      return reply.send(rows[0]);
    } catch {
      return reply.status(500).send({ error: 'Erro ao buscar produto' });
    }
  });

  // Atualizar produto
  fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string }, Body: Product }>, reply: FastifyReply) => {
    const id = Number(request.params.id);
    const { name, description, price, stock, category_id } = request.body;

    if (!name || price == null || stock == null) {
      return reply.status(400).send({ error: 'Campos obrigatórios: name, price, stock' });
    }

    try {
      const [result] = await db.execute<ResultSetHeader>(
        `UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?`,
        [name, description || null, price, stock, category_id || null, id]
      );
      if (result.affectedRows === 0) {
        return reply.status(404).send({ error: 'Produto não encontrado' });
      }

      const [rows] = await db.execute<RowDataPacket[]>(
        'SELECT * FROM products WHERE id = ?',
        [id]
      );
      return reply.send(rows[0]);
    } catch {
      return reply.status(500).send({ error: 'Erro ao atualizar produto' });
    }
  });

  // Deletar produto
  fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const id = Number(request.params.id);

    try {
      const [result] = await db.execute<ResultSetHeader>(
        'DELETE FROM products WHERE id = ?',
        [id]
      );
      if (result.affectedRows === 0) {
        return reply.status(404).send({ error: 'Produto não encontrado' });
      }
      return reply.status(204).send();
    } catch {
      return reply.status(500).send({ error: 'Erro ao deletar produto' });
    }
  });
}


