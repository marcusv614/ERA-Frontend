import styles from './EmptyState.module.css';

export function EmptyState({ title, description }) {
  return (
    <div className={styles.empty}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
