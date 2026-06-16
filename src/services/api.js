const DEFAULT_API_URL = '';

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
  authMode: import.meta.env.VITE_AUTH_MODE || 'api',
};

export async function request(path, options = {}) {
  const response = await fetch(`${apiConfig.baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Nao foi possivel concluir a requisicao.');
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}
