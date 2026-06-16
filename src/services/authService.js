import { apiConfig, request } from './api.js';

const STORAGE_KEY = 'estoque_dashboard_user';

export function getStoredUser() {
  const rawUser = localStorage.getItem(STORAGE_KEY);
  return rawUser ? JSON.parse(rawUser) : null;
}

export function storeUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(STORAGE_KEY);
}

export async function loginUser(credentials) {
  if (apiConfig.authMode === 'demo') {
    if (!credentials.email || !credentials.password) {
      throw new Error('Informe usuario e senha.');
    }

    return {
      id: crypto.randomUUID(),
      name: credentials.email.split('@')[0] || 'Usuario',
      email: credentials.email,
    };
  }

  const users = await request('/api/usuarios');
  const user = users.find(
    (currentUser) =>
      currentUser.ativo !== false &&
      currentUser.email === credentials.email &&
      currentUser.senhaHash === credentials.password,
  );

  if (!user) {
    throw new Error('Usuario ou senha invalidos.');
  }

  return {
    id: user.id,
    name: user.nome,
    email: user.email,
    cargo: user.cargo,
  };
}
