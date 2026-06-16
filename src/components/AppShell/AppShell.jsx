import styles from './AppShell.module.css';

export function AppShell({ children, user, onLogout }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div>
          <p className={styles.eyebrow}>Dashboard</p>
          <h1 className={styles.logo}>ERA</h1>
        </div>
        <nav className={styles.nav} aria-label="Navegacao principal">
          <a className={styles.navItem} href="#resumo">
            Resumo
          </a>
          <a className={styles.navItem} href="#produtos">
            Produtos
          </a>
          <a className={styles.navItem} href="#movimentos">
            Movimentos
          </a>
          <a className={styles.navItem} href="#localizacoes">
            Localizacoes
          </a>
        </nav>
        <div className={styles.userBox}>
          <span>{user?.name || user?.email || 'Usuario'}</span>
          <button className={styles.logoutButton} onClick={onLogout} type="button">
            Sair
          </button>
        </div>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
