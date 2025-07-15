import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Courses.css';

interface Course {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get<Course[]>('/courses');
      setCourses(response.data);
    } catch (err) {
      console.error('Erro ao carregar courses:', err);
      setError('Erro ao carregar courses');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);

    if (!name || !price || isNaN(parsedPrice)) {
      setError('Preencha nome e duração corretamente');
      return;
    }

    try {
      await api.post('/courses', {
        name,
        price: parsedPrice,
        stock: 1,
      });
      setName('');
      setPrice('');
      setError(null);
      fetchCourses();
    } catch (err: any) {
      console.error('Erro ao criar course:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Erro ao criar course');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja excluir este course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error('Erro ao deletar course:', err);
      setError('Erro ao deletar course');
    }
  };

  const startEdit = (course: Course) => {
    setEditingId(course.id);
    setEditName(course.name);
    setEditPrice(course.price.toString());
  };

  const handleUpdate = async (id: number) => {
    const parsedEditPrice = parseFloat(editPrice);
    if (!editName || isNaN(parsedEditPrice)) {
      setError('Preencha nome e duração corretamente');
      return;
    }
    try {
      await api.put(`/courses/${id}`, {
        name: editName,
        price: parsedEditPrice,
        stock: 1,
      });
      setEditingId(null);
      fetchCourses();
    } catch (err) {
      console.error('Erro ao atualizar course:', err);
      setError('Erro ao atualizar course');
    }
  };

  return (
    <div className="page">
      <header className="site-header">
        <div className="logo">🎓 CalouroCursos</div>
        <nav>
          <a href="/">Início</a>
          <a href="/courses">Cursos</a>
          <a href="/blog">Dicas</a>
          <button className="btn-cta">Cadastrar curso</button>
        </nav>
      </header>

      <section className="hero">
        <h1>Descubra os melhores cursos para sua jornada acadêmica!</h1>
        <p>Conheça cursos incríveis pensados para te preparar para o futuro.</p>
      </section>

      <main className="container">
        <form onSubmit={handleCreateCourse} className="add-form">
          {error && <div className="error">{error}</div>}
          <input
            placeholder="Nome do Curso"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Duração (meses)"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <button type="submit">Adicionar cursos</button>
        </form>

        {loading ? (
          <p>Carregando cursos...</p>
        ) : courses.length === 0 ? (
          <p>Nenhum cursos encontrado.</p>
        ) : (
          <table className="course-table">
            <thead>
              <tr>
                <th>Nome do Curso</th>
                <th>Duração (meses)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id}>
                  {editingId === c.id ? (
                    <>
                      <td>
                        <input
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={e => setEditPrice(e.target.value)}
                        />
                      </td>
                      <td>
                        <button onClick={() => handleUpdate(c.id)}>Salvar</button>
                        <button onClick={() => setEditingId(null)}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{c.name}</td>
                      <td>{c.price} meses</td>
                      <td>
                        <button onClick={() => startEdit(c)}>✏️</button>
                        <button onClick={() => handleDelete(c.id)}>🗑️</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <footer className="site-footer">
        <div>
          <a href="/about">Sobre</a> • <a href="/terms">Termos</a> • <a href="/contact">Contato</a>
        </div>
        <div>© 2025 CalouroCursos — Prepare-se para um futuro brilhante!</div>
      </footer>
    </div>
  );
};

export default Courses;



