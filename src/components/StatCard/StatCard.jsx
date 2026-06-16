import styles from './StatCard.module.css';

export function StatCard({ label, value, helper }) {
  return (
    <article className={styles.card}>
      <span className={styles.label}>{label}</span>
      <strong className={styles.value}>{value}</strong>
      <small className={styles.helper}>{helper}</small>
    </article>
  );
}
