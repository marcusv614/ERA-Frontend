import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '../../components/AppShell/index.js';
import { EmptyState } from '../../components/EmptyState/index.js';
import { LocationForm } from '../../components/LocationForm/index.js';
import { MovementForm } from '../../components/MovementForm/index.js';
import { ProductForm } from '../../components/ProductForm/index.js';
import { ProductTable } from '../../components/ProductTable/index.js';
import { SimpleTable } from '../../components/SimpleTable/index.js';
import { StatCard } from '../../components/StatCard/index.js';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  createLocalizacao,
  createMovimentacao,
  createProduto,
  deleteProduto,
  findEstoqueByProduto,
  listDevolucoes,
  listEntradas,
  listLocalizacoes,
  listMovimentacoes,
  listProdutos,
  listRetiradas,
  listUsuarios,
} from '../../services/eraService.js';
import styles from './DashboardPage.module.css';

function formatDate(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

function buildMovementPayload(form) {
  return {
    usuario: { id: Number(form.usuarioId) },
    produto: { id: Number(form.produtoId) },
    tipo: form.tipo,
    quantidade: Number(form.quantidade),
  };
}

export function DashboardPage() {
  const { logout, user } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [localizacoes, setLocalizacoes] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [retiradas, setRetiradas] = useState([]);
  const [devolucoes, setDevolucoes] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [estoqueSelecionado, setEstoqueSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const stats = useMemo(
    () => ({
      produtos: produtos.length,
      usuariosAtivos: usuarios.filter((usuario) => usuario.ativo !== false).length,
      localizacoes: localizacoes.length,
      movimentos: entradas.length + retiradas.length + devolucoes.length + movimentacoes.length,
    }),
    [devolucoes.length, entradas.length, localizacoes.length, movimentacoes.length, produtos.length, retiradas.length, usuarios],
  );

  async function loadData() {
    const [
      nextProdutos,
      nextUsuarios,
      nextLocalizacoes,
      nextEntradas,
      nextRetiradas,
      nextDevolucoes,
      nextMovimentacoes,
    ] = await Promise.all([
      listProdutos(),
      listUsuarios(),
      listLocalizacoes(),
      listEntradas(),
      listRetiradas(),
      listDevolucoes(),
      listMovimentacoes(),
    ]);

    setProdutos(nextProdutos);
    setUsuarios(nextUsuarios);
    setLocalizacoes(nextLocalizacoes);
    setEntradas(nextEntradas);
    setRetiradas(nextRetiradas);
    setDevolucoes(nextDevolucoes);
    setMovimentacoes(nextMovimentacoes);
  }

  useEffect(() => {
    async function start() {
      try {
        setLoading(true);
        await loadData();
      } catch (currentError) {
        setError(currentError.message || 'Nao foi possivel carregar os dados da API ERA.');
      } finally {
        setLoading(false);
      }
    }

    start();
  }, []);

  async function handleCreateProduto(produto) {
    try {
      setSaving(true);
      setError('');
      const createdProduto = await createProduto(produto);
      setProdutos((currentProdutos) => [createdProduto, ...currentProdutos]);
    } catch (currentError) {
      setError(currentError.message || 'Nao foi possivel cadastrar o produto.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProduto(id) {
    try {
      setError('');
      await deleteProduto(id);
      setProdutos((currentProdutos) => currentProdutos.filter((produto) => produto.id !== id));
    } catch (currentError) {
      setError(currentError.message || 'Nao foi possivel excluir o produto.');
    }
  }

  async function handleCreateLocalizacao(localizacao) {
    try {
      setSaving(true);
      setError('');
      const createdLocalizacao = await createLocalizacao(localizacao);
      setLocalizacoes((currentLocalizacoes) => [createdLocalizacao, ...currentLocalizacoes]);
    } catch (currentError) {
      setError(currentError.message || 'Nao foi possivel cadastrar a localizacao.');
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateMovement(form) {
    try {
      setSaving(true);
      setError('');
      const payload = buildMovementPayload(form);
      const createdMovimentacao = await createMovimentacao(payload);
      setMovimentacoes((currentMovimentacoes) => [createdMovimentacao, ...currentMovimentacoes]);
    } catch (currentError) {
      setError(currentError.message || 'Nao foi possivel registrar o movimento.');
    } finally {
      setSaving(false);
    }
  }

  async function handleSelectStock(produto) {
    try {
      setError('');
      const estoque = await findEstoqueByProduto(produto.id);
      setEstoqueSelecionado({ produto, estoque });
    } catch (currentError) {
      setError(currentError.message || 'Nao foi possivel consultar o estoque do produto.');
    }
  }

  return (
    <AppShell onLogout={logout} user={user}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>API ERA</p>
          <h1>Controle de estoque</h1>
        </div>
      </section>

      {error ? <p className={styles.error}>{error}</p> : null}

      <section className={styles.stats} id="resumo">
        <StatCard helper="Registros em /api/produtos" label="Produtos" value={stats.produtos} />
        <StatCard helper="Usuarios ativos em /api/usuarios" label="Usuarios ativos" value={stats.usuariosAtivos} />
        <StatCard helper="Enderecos cadastrados" label="Localizacoes" value={stats.localizacoes} />
        <StatCard helper="Entradas, retiradas, devolucoes e movimentacoes" label="Movimentos" value={stats.movimentos} />
      </section>

      <section className={styles.layout} id="produtos">
        <ProductForm onSubmit={handleCreateProduto} saving={saving} />

        <div className={styles.listArea}>
          <div className={styles.sectionHeader}>
            <h2>Produtos</h2>
            <span>{loading ? 'Carregando...' : `${produtos.length} produto(s)`}</span>
          </div>

          {!loading && produtos.length === 0 ? (
            <EmptyState description="Cadastre produtos usando os campos do model Produto." title="Nenhum produto encontrado" />
          ) : null}

          {produtos.length > 0 ? (
            <ProductTable onDelete={handleDeleteProduto} onSelectStock={handleSelectStock} produtos={produtos} />
          ) : null}
        </div>
      </section>

      {estoqueSelecionado ? (
        <section className={styles.panel}>
          <div className={styles.sectionHeader}>
            <h2>Estoque de {estoqueSelecionado.produto.nome}</h2>
            <span>/api/estoque/produto/{estoqueSelecionado.produto.id}</span>
          </div>
          {estoqueSelecionado.estoque.length > 0 ? (
            <SimpleTable
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'localizacao', label: 'Localizacao', render: (row) => `${row.localizacao?.rua || '-'} / ${row.localizacao?.ilha || '-'} / ${row.localizacao?.andar || '-'}` },
                { key: 'quantidadeAtual', label: 'Quantidade' },
              ]}
              rows={estoqueSelecionado.estoque}
            />
          ) : (
            <EmptyState description="A API retornou lista vazia para este produto." title="Sem estoque registrado" />
          )}
        </section>
      ) : null}

      <section className={styles.layout} id="movimentos">
        <MovementForm onSubmit={handleCreateMovement} produtos={produtos} saving={saving} usuarios={usuarios} />

        <div className={styles.listArea}>
          <div className={styles.sectionHeader}>
            <h2>Movimentacoes recentes</h2>
            <span>{movimentacoes.length} registro(s)</span>
          </div>
          <SimpleTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'tipo', label: 'Tipo' },
              { key: 'produto', label: 'Produto', render: (row) => row.produto?.nome || '-' },
              { key: 'quantidade', label: 'Qtd.' },
              { key: 'usuario', label: 'Usuario', render: (row) => row.usuario?.nome || '-' },
            ]}
            rows={movimentacoes.slice(0, 8)}
          />

          <div className={styles.sectionHeader}>
            <h2>Entradas recentes</h2>
            <span>{entradas.length} registro(s)</span>
          </div>
          <SimpleTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'numeroNota', label: 'Nota' },
              { key: 'usuario', label: 'Usuario', render: (row) => row.usuario?.nome || '-' },
              { key: 'dataEntrada', label: 'Data', render: (row) => formatDate(row.dataEntrada) },
            ]}
            rows={entradas.slice(0, 8)}
          />

          <div className={styles.sectionHeader}>
            <h2>Retiradas recentes</h2>
            <span>{retiradas.length} registro(s)</span>
          </div>
          <SimpleTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'status', label: 'Status' },
              { key: 'motivo', label: 'Motivo' },
              { key: 'usuarioResponsavel', label: 'Usuario', render: (row) => row.usuarioResponsavel?.nome || '-' },
            ]}
            rows={retiradas.slice(0, 8)}
          />
        </div>
      </section>

      <section className={styles.layout} id="localizacoes">
        <LocationForm onSubmit={handleCreateLocalizacao} saving={saving} />

        <div className={styles.listArea}>
          <div className={styles.sectionHeader}>
            <h2>Localizacoes</h2>
            <span>{localizacoes.length} registro(s)</span>
          </div>
          <SimpleTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'rua', label: 'Rua' },
              { key: 'ilha', label: 'Ilha' },
              { key: 'andar', label: 'Andar' },
              { key: 'observacao', label: 'Observacao' },
            ]}
            rows={localizacoes}
          />
        </div>
      </section>
    </AppShell>
  );
}
