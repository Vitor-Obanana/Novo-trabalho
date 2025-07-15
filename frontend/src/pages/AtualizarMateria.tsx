import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function AtualizarMateria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [carga, setCarga] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      const res = await api.get(`/materias/${id}`);
      setNome(res.data.nome);
      setCarga(res.data.carga_horaria);
      setDescricao(res.data.descricao);
    }
    carregar();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/materias/${id}`, {
        nome,
        carga_horaria: parseInt(carga),
        descricao,
      });
      navigate('/materias');
    } catch {
      setErro('Erro ao atualizar matéria');
    }
  };

  return (
    <div className="materia-container">
      <h2>Editar Matéria</h2>
      <form onSubmit={handleUpdate} className="materia-form">
        {erro && <p className="error">{erro}</p>}
        <input value={nome} onChange={e => setNome(e.target.value)} />
        <input
          type="number"
          value={carga}
          onChange={e => setCarga(e.target.value)}
        />
        <input
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

