import api from './api';

export async function criarCategoria(nome: string) {
  try {
    const response = await api.post('/categories', { name: nome });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar categoria', error);
    throw error;
  }
}