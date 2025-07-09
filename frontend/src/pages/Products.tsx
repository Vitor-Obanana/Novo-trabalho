import React, { useEffect, useState } from 'react';
import api from '../services/api';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get<Product[]>('/products');
      setProducts(response.data);
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
        stock: 1 // valor padrão só para satisfazer o backend
      });
      setName('');
      setPrice('');
      setError(null);
      fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar produto');
    }
  };

  return (
    <div>
      <h1>Produtos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      
    </div>
  );
};

export default Products;


