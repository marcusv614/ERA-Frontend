import { useState } from 'react';
import styles from './ProductForm.module.css';

const initialForm = {
  codigo: '',
  nome: '',
  descricao: '',
  categoriaId: '',
  unidadeMedida: 'UN',
};

export function ProductForm({ onSubmit, saving }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      codigo: form.codigo,
      nome: form.nome,
      descricao: form.descricao,
      unidadeMedida: form.unidadeMedida,
      categoria: {
        id: Number(form.categoriaId),
      },
    });
    setForm(initialForm);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2>Novo produto</h2>
      </div>

      <label className={styles.field}>
        <span>Codigo</span>
        <input name="codigo" onChange={handleChange} required value={form.codigo} />
      </label>

      <label className={styles.field}>
        <span>Nome</span>
        <input name="nome" onChange={handleChange} required value={form.nome} />
      </label>

      <label className={styles.field}>
        <span>Descricao</span>
        <textarea name="descricao" onChange={handleChange} rows="3" value={form.descricao} />
      </label>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>ID da categoria</span>
          <input min="1" name="categoriaId" onChange={handleChange} required type="number" value={form.categoriaId} />
        </label>

        <label className={styles.field}>
          <span>Unidade</span>
          <input name="unidadeMedida" onChange={handleChange} required value={form.unidadeMedida} />
        </label>
      </div>

      <button className={styles.submitButton} disabled={saving} type="submit">
        {saving ? 'Salvando...' : 'Cadastrar produto'}
      </button>
    </form>
  );
}
