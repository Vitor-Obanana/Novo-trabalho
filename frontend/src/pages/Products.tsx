import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Products.css';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Para editar valores temporariamente
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get<Product[]>('/products');
      setProducts(response.data);
      setLoading(false);
    } catch {
      setError('Erro ao carregar produtos');
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      setError('Preencha nome e preço');
      return;
    }
    try {
      await api.post('/products', {
        name,
        price: parseFloat(price),
        stock: 1
      });
      setName('');
      setPrice('');
      setError(null);
      fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar produto');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja excluir este produto?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch {
      setError('Erro ao deletar');
    }
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toString());
  };

  const handleUpdate = async (id: number) => {
    if (!editName || !editPrice) {
      setError('Preencha os campos');
      return;
    }
    try {
      await api.put(`/products/${id}`, {
        name: editName,
        price: parseFloat(editPrice),
        stock: 1
      });
      setEditingId(null);
      fetchProducts();
    } catch {
      setError('Erro ao atualizar');
    }
  };

  return (
    <div className="page">
      <header className="site-header">
        <div className="logo">🦸 FlipHQ</div>
        <nav>
          <a href="/">Início</a>
          <a href="/products">HQs</a>
          <a href="/blog">Blog</a>
          <button className="btn-cta">Publicar minha HQ</button>
        </nav>
      </header>

      <section className="hero">
        <h1>Encontre sua próxima HQ!</h1>
        <p>Plataforma dedicada aos apaixonados por quadrinhos.</p>
      </section>

      <main className="container">
        <form onSubmit={handleCreateProduct} className="add-form">
          {error && <div className="error">{error}</div>}
          <input
            placeholder="Nome da HQ"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Adicionar HQ</button>
        </form>

        {loading ? (
          <p>Carregando HQs...</p>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <div className="card" key={p.id}>
                {editingId === p.id ? (
                  <>
                    <div className="card-content">
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      <input
                        value={editPrice}
                        type="number"
                        onChange={(e) => setEditPrice(e.target.value)}
                      />
                    </div>
                    <div className="card-actions">
                      <button onClick={() => handleUpdate(p.id)}>Salvar</button>
                      <button onClick={() => setEditingId(null)}>Cancelar</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card-content">
                      <h3>{p.name}</h3>
                     <p>R$ {Number(p.price).toFixed(2)}</p>

                      <span>Estoque: {p.stock}</span>
                    </div>
                    <div className="card-actions">
                      <button onClick={() => startEdit(p)}>✏️ Editar</button>
                      <button onClick={() => handleDelete(p.id)}>🗑️ Excluir</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div>
          <a href="/about">Sobre</a> • <a href="/terms">Termos</a> • <a href="/contact">Contato</a>
        </div>
        <div>© 2025 FlipHQ — Quadrinho é pra todo mundo!</div>
      </footer>
    </div>
  );
};

export default Products;



