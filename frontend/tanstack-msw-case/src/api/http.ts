// [MP-TC-3] Shared fetch wrapper with optional init overrides.
const request = async (url: string, init?: RequestInit) => {
  const response = await fetch(url, init)
  return response
}

// [MP-TC-3] GET helper with optional init.
export async function get<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await request(url, init)
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }
  return response.json()
}

// [MP-TC-3] POST helper with JSON payload.
export async function post<T>(url: string, body: unknown, init?: RequestInit): Promise<T> {
  const response = await request(url, {
    ...init,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }
  return response.json()
}

// [MP-TC-3] DELETE helper with optional init.
export async function del(url: string, init?: RequestInit): Promise<void> {
  const response = await request(url, { ...init, method: 'DELETE' })
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }
}
