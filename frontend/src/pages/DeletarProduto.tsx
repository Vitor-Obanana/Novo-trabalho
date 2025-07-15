import { useState } from 'react';
import './Form.css';

export default function ExcluirProduto() {
  const [id, setId] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();

    if (!id.trim()) {
      setMensagem('É necessário informar o ID do produto para excluir.');
      return;
    }

    console.log('ID digitado:', id);

    setMensagem('Enviando solicitação de exclusão...');

    try {
      const resposta = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
      });


      if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.mensagem || 'Erro ao excluir o produto');
      }

      setMensagem('Produto excluído com sucesso!');
      setId('');
    } catch (err: any) {
      setMensagem(`Erro: ${err.message}`);
    }
  }

  return (
    <div className="form-container">
      <h2>Excluir Produto</h2>
      <form onSubmit={handleDelete}>
        <label>
          ID do Produto:
          <input
            type="number"
            value={id}
            onChange={e => setId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Excluir Produto</button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}