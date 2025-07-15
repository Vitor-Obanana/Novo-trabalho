import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Materia.css';

interface Materia {
  id: number;
  nome: string;
  carga_horaria: number;
  descricao: string;
}

export default function Materias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [nome, setNome] = useState('');
  const [carga, setCarga] = useState('');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMaterias();
  }, []);

  const fetchMaterias = async () => {
    try {
      const response = await api.get('/materias');
      setMaterias(response.data);
    } catch {
      setError('Erro ao carregar matérias');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/materias', {
        nome,
        carga_horaria: parseInt(carga),
        descricao,
      });
      setNome('');
      setCarga('');
      setDescricao('');
      fetchMaterias();
    } catch {
      setError('Erro ao cadastrar matéria');
    }
  };

  return (
    <div className="page">
      {/* Header com navegação */}
      <header className="site-header">
        <div className="logo">🎓 CalouroShop</div>
        <nav>
          <a href="/home">Início</a>
          <a href="/materia">Matérias</a>
          <a href="/blog">Dicas</a>
          <button className="btn-cta">Cadastrar Matéria</button>
        </nav>
      </header>

      {/* Hero - destaque do site */}
      <section className="hero">
        <h1>Encontre ou cadastre as matérias da sua grade universitária</h1>
        <p>Facilite sua organização acadêmica cadastrando cada disciplina com descrição e carga horária.</p>
      </section>

      {/* Formulário de criação */}
      <main className="container">
        <form onSubmit={handleCreate} className="materia-form">
          {error && <p className="error">{error}</p>}
          <input
            placeholder="Nome da Matéria"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <input
            type="number"
            placeholder="Carga Horária"
            value={carga}
            onChange={e => setCarga(e.target.value)}
          />
          <input
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </form>

        {/* Lista de matérias */}
        <ul className="materia-list">
          {materias.map(m => (
            <li key={m.id}>
              <strong>{m.nome}</strong> — {m.carga_horaria}h
              <br />
              <small>{m.descricao}</small>
              <div className="actions">
                <button onClick={() => navigate(`/materias/editar/${m.id}`)}>✏️</button>
                <button onClick={() => navigate(`/materias/deletar/${m.id}`)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Rodapé */}
      <footer className="site-footer">
        <div>
          <a href="/about">Sobre</a> • <a href="/terms">Termos</a> • <a href="/contact">Contato</a>
        </div>
        <div>© 2025 CalouroShop — Comece sua jornada com o pé direito!</div>
      </footer>
    </div>
  );
}


