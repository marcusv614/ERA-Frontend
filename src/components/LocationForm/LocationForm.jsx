import { useState } from 'react';
import styles from './LocationForm.module.css';

const initialForm = {
  rua: '',
  ilha: '',
  andar: '',
  observacao: '',
};

export function LocationForm({ onSubmit, saving }) {
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
      <h2>Nova localizacao</h2>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Rua</span>
          <input name="rua" onChange={handleChange} required value={form.rua} />
        </label>
        <label className={styles.field}>
          <span>Ilha</span>
          <input name="ilha" onChange={handleChange} required value={form.ilha} />
        </label>
        <label className={styles.field}>
          <span>Andar</span>
          <input name="andar" onChange={handleChange} required value={form.andar} />
        </label>
      </div>
      <label className={styles.field}>
        <span>Observacao</span>
        <input name="observacao" onChange={handleChange} value={form.observacao} />
      </label>
      <button className={styles.submitButton} disabled={saving} type="submit">
        {saving ? 'Salvando...' : 'Cadastrar localizacao'}
      </button>
    </form>
  );
}
