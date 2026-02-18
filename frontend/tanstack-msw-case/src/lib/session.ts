import type { CourierSession } from '@/features/couriers/types'

let cachedSession: CourierSession | null = null

// [MP-BG-4] Retrieve the in-memory session.
export const getSession = (): CourierSession | null => cachedSession

// [MP-BG-4] Store the session in memory only.
export const setSession = (session: CourierSession | null) => {
  cachedSession = session
}

// [MP-BG-4] Clear the session from memory.
export const clearSession = () => {
  cachedSession = null
}
