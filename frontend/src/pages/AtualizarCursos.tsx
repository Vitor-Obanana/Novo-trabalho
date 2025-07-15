import { useState } from 'react';
import './Form.css';

export default function AtualizarProduto() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) {
      setMensagem('É necessário informar o ID do produto.');
      return;
    }

    if (!nome && !preco && !categoria) {
      setMensagem('Informe pelo menos um campo para atualizar.');
      return;
    }

    setMensagem('Enviando atualização...');

    try {
      const resposta = await fetch(`http://localhost:3000/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome || undefined,
          preco: preco ? parseFloat(preco) : undefined,
          categoria: categoria || undefined,
        }),
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.mensagem || 'Erro ao atualizar curso');
      }

      setMensagem('Curso atualizado com sucesso!');
      setId('');
      setNome('');
      setPreco('');
      setCategoria('');
    } catch (err: any) {
      setMensagem(`Erro: ${err.message}`);
    }
  }

  return (
    <div className="form-container">
      <h2>Atualizar Produto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID do Curso:
          <input
            type="number"
            value={id}
            onChange={e => setId(e.target.value)}
            required
          />
        </label>
        <label>
          Novo Nome:
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </label>
        <label>
          Novo Preço:
          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={e => setPreco(e.target.value)}
          />
        </label>
        <label>
          Nova Categoria:
          <select value={categoria} onChange={e => setCategoria(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="Brinquedos">Brinquedos</option>
            <option value="Acessórios">Acessórios</option>
            <option value="Produtos Gerais">Produtos Gerais</option>
            <option value="Ofertas">Ofertas</option>
            <option value="Pelúcias">Pelúcias</option>
            <option value="Camisetas">Camisetas</option>
          </select>
        </label>
        <button type="submit">Atualizar Cursos</button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}
