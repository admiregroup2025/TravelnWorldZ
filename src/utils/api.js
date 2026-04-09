const rawApiBase = import.meta.env.VITE_API_BASE;
const normalizedApiBase =
  rawApiBase && rawApiBase !== "undefined" && rawApiBase !== "null"
    ? rawApiBase
    : "";

export const API_BASE =
  normalizedApiBase ||
  (typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
    ? "http://localhost:5000"
    : "");

export const USE_BACKEND = Boolean(normalizedApiBase);


export async function getJson(path) {
	const res = await fetch(`${API_BASE}${path}`);
	if (!res.ok) throw new Error(`Request failed: ${res.status}`);
	return res.json();
}

export async function postJson(path, body, options = {}) {
    const token = localStorage.getItem('twz_auth_token');
    const headers = { 
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(options.headers || {}) 
    };
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body || {}),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const message = data?.message || `Request failed: ${res.status}`;
        throw new Error(message);
    }
    return data;
}

export async function putJson(path, body, options = {}) {
    const token = localStorage.getItem('twz_auth_token');
    const headers = { 
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(options.headers || {}) 
    };
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body || {}),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const message = data?.message || `Request failed: ${res.status}`;
        throw new Error(message);
    }
    return data;
}

export async function deleteJson(path, options = {}) {
    const token = localStorage.getItem('twz_auth_token');
    const headers = { 
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(options.headers || {}) 
    };
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'DELETE',
        headers,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const message = data?.message || `Request failed: ${res.status}`;
        throw new Error(message);
    }
    return data;
}

export async function getJsonWithAuth(path, options = {}) {
    const token = localStorage.getItem('twz_auth_token');
    const headers = { 
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(options.headers || {}) 
    };
    const res = await fetch(`${API_BASE}${path}`, { headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const message = data?.message || `Request failed: ${res.status}`;
        throw new Error(message);
    }
    return data;
}


