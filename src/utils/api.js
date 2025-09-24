export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
export const USE_BACKEND = String(import.meta.env.VITE_USE_BACKEND).toLowerCase() === "true";

export async function getJson(path) {
	const res = await fetch(`${API_BASE}${path}`);
	if (!res.ok) throw new Error(`Request failed: ${res.status}`);
	return res.json();
}


