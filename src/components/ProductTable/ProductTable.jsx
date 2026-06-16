import styles from './ProductTable.module.css';

export function ProductTable({ onDelete, onSelectStock, produtos }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Unidade</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td data-label="Codigo">{produto.codigo}</td>
              <td data-label="Produto">
                <strong>{produto.nome}</strong>
                <span>{produto.descricao || 'Sem descricao'}</span>
              </td>
              <td data-label="Categoria">{produto.categoria?.nome || `#${produto.categoria?.id || '-'}`}</td>
              <td data-label="Unidade">{produto.unidadeMedida}</td>
              <td data-label="Acoes">
                <div className={styles.actions}>
                  <button className={styles.secondaryButton} onClick={() => onSelectStock(produto)} type="button">
                    Estoque
                  </button>
                  <button className={styles.dangerButton} onClick={() => onDelete(produto.id)} type="button">
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
