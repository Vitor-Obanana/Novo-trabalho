import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface User {
  id: number;
  nome: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get<User[]>('/users');
      setUsers(response.data);
    } catch {
      setError('Erro ao carregar usuários');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email) {
      setError('Preencha nome e email');
      return;
    }
    try {
      await api.post('/users', { nome, email });
      setNome('');
      setEmail('');
      setError(null);
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar usuário');
    }
  };

  return (
    <div>
      <h1>Usuários</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.nome} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
