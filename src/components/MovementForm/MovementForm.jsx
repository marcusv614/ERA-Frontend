import { useState } from 'react';
import styles from './MovementForm.module.css';

const initialForm = {
  tipo: 'ENTRADA',
  produtoId: '',
  usuarioId: '',
  quantidade: 1,
};

export function MovementForm({ onSubmit, produtos, saving, usuarios }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
    setForm(initialForm);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Registrar movimento</h2>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Tipo</span>
          <select name="tipo" onChange={handleChange} value={form.tipo}>
            <option value="ENTRADA">Entrada</option>
            <option value="RETIRADA">Retirada</option>
            <option value="DEVOLUCAO">Devolucao</option>
            <option value="AJUSTE">Ajuste</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Produto</span>
          <select name="produtoId" onChange={handleChange} required value={form.produtoId}>
            <option value="">Selecione</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.codigo} - {produto.nome}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Usuario</span>
          <select name="usuarioId" onChange={handleChange} required value={form.usuarioId}>
            <option value="">Selecione</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Quantidade</span>
          <input min="0.01" name="quantidade" onChange={handleChange} required step="0.01" type="number" value={form.quantidade} />
        </label>
      </div>

      <button className={styles.submitButton} disabled={saving} type="submit">
        {saving ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  );
}
