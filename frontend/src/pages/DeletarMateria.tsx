import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function DeletarMateria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [materia, setMateria] = useState<any>(null);

  useEffect(() => {
    async function carregar() {
      const res = await api.get(`/materias/${id}`);
      setMateria(res.data);
    }
    carregar();
  }, [id]);

  const handleDelete = async () => {
    await api.delete(`/materias/${id}`);
    navigate('/materias');
  };

  return (
    <div className="materia-container">
      <h2>Excluir Matéria</h2>
      {materia && (
        <>
          <p>Tem certeza que deseja excluir a matéria <strong>{materia.nome}</strong>?</p>
          <button onClick={handleDelete}>Sim, excluir</button>
          <button onClick={() => navigate('/materias')}>Cancelar</button>
        </>
      )}
    </div>
  );
}
