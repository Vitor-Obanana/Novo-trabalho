import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#4a4a4a' }}>Bem-vindo ao CalouroShop</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Seu marketplace ideal para começar a faculdade com o pé direito.
        </p>
      </header>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛒 Sobre o CalouroShop</h2>
        <p style={{ fontSize: '1rem', color: '#333' }}>
          O CalouroShop é um projeto criado para facilitar a vida dos calouros universitários. Aqui, você encontra
          mochilas, materiais, eletrônicos, itens personalizados da sua instituição e muito mais!
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>✨ Destaques</h2>
        <ul style={{ listStyle: 'square', paddingLeft: '1.5rem', color: '#333' }}>
          <li>Produtos com desconto para estudantes</li>
          <li>Parcerias com instituições</li>
          <li>Entrega rápida e segura</li>
          <li>Itens personalizados e exclusivos</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📦 Nossos Produtos</h2>
        <p style={{ color: '#333' }}>
          Temos uma variedade de produtos essenciais para sua rotina acadêmica, incluindo:
        </p>
        <ol style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', color: '#333' }}>
          <li>Material Escolar</li>
          <li>Notebook e Acessórios</li>
          <li>Produtos de Higiene e Alimentação</li>
          <li>Roupas personalizadas</li>
        </ol>
      </section>

      {/* SEÇÃO DE BOTÕES */}
      <section style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#444' }}>
          Pronto para começar a explorar?
        </p>

        <Link to="/products">
          <button
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4f46e5',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Ver Produtos
          </button>
        </Link>

        <Link to="/courses">
          <button
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4f46e5',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginLeft: '1rem',
            }}
          >
            Ver Cursos
          </button>
        </Link>

        <Link to="/materias">
          <button
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4f46e5',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginLeft: '1rem',
            }}
          >
            Ver Matérias
          </button>
        </Link>
      </section>

      <footer style={{ textAlign: 'center', marginTop: '4rem', fontSize: '0.9rem', color: '#aaa' }}>
        © {new Date().getFullYear()} CalouroShop - Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Home;
