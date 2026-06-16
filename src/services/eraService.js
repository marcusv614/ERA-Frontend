import { request } from './api.js';

export function listProdutos() {
  return request('/api/produtos');
}

export function createProduto(produto) {
  return request('/api/produtos', {
    method: 'POST',
    body: JSON.stringify(produto),
  });
}

export function deleteProduto(id) {
  return request(`/api/produtos/${id}`, {
    method: 'DELETE',
  });
}

export function listUsuarios() {
  return request('/api/usuarios');
}

export function listLocalizacoes() {
  return request('/api/localizacoes');
}

export function createLocalizacao(localizacao) {
  return request('/api/localizacoes', {
    method: 'POST',
    body: JSON.stringify(localizacao),
  });
}

export function listEntradas() {
  return request('/api/entradas');
}

export function createEntrada(entrada) {
  return request('/api/entradas', {
    method: 'POST',
    body: JSON.stringify(entrada),
  });
}

export function listRetiradas() {
  return request('/api/retiradas');
}

export function createRetirada(retirada) {
  return request('/api/retiradas', {
    method: 'POST',
    body: JSON.stringify(retirada),
  });
}

export function listDevolucoes() {
  return request('/api/devolucoes');
}

export function listMovimentacoes() {
  return request('/api/movimentacoes');
}

export function createMovimentacao(movimentacao) {
  return request('/api/movimentacoes', {
    method: 'POST',
    body: JSON.stringify(movimentacao),
  });
}

export function findEstoqueByProduto(produtoId) {
  return request(`/api/estoque/produto/${produtoId}`);
}
