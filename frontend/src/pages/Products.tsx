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
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
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
      console.error('Erro ao criar produto:', err);
      setError(err.response?.data?.error || 'Erro ao criar produto');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja excluir este produto?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
      setError('Erro ao deletar produto');
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
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      setError('Erro ao atualizar produto');
    }
  };

  return (
    <div className="page">
      <header className="site-header">
        <div className="logo">🎓 CalouroShop</div>
        <nav>
          <a href="Home.tsx">Início</a>
          <a href="/products">Produtos</a>
          <a href="/blog">Dicas</a>
          <button className="btn-cta">Anunciar Produto</button>
        </nav>
      </header>

      <section className="hero">
        <h1>O que você precisa para a faculdade, está aqui!</h1>
        <p>Materiais e itens essenciais para calouros de Medicina, Engenharia e muito mais.</p>
      </section>

      <main className="container">
        <form onSubmit={handleCreateProduct} className="add-form">
          {error && <div className="error">{error}</div>}
          <input
            placeholder="Nome do Produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Adicionar Produto</button>
        </form>

        {loading ? (
          <p>Carregando produtos...</p>
        ) : products.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
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
                      <p>Preço: R$ {Number(p.price || 0).toFixed(2)}</p>
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
        <div>© 2025 CalouroShop — Comece sua jornada com o pé direito!</div>
      </footer>
    </div>
  );
};

export default Products;


