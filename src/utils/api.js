export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
export const USE_BACKEND = String(import.meta.env.VITE_USE_BACKEND).toLowerCase() === "true";

export async function getJson(path) {
	const res = await fetch(`${API_BASE}${path}`);
	if (!res.ok) throw new Error(`Request failed: ${res.status}`);
	return res.json();
}

export async function postJson(path, body, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
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


