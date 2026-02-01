// API base URL - development'da localhost, production'da relative path (nginx proxy)
export const API_URL = import.meta.env.DEV
  ? 'http://localhost:3001'
  : '';

export async function login(password) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  return res.json();
}

export async function addToken(tokenKey) {
  const res = await fetch(`${API_URL}/api/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenKey })
  });
  return res.json();
}
