import { z } from 'zod'
import type { CourierSession, CourierSessionRefreshResponse } from '@/features/couriers/types'

const sessionSchema = z.object({
  token: z.string().min(1),
  expiresAt: z.string().min(1),
}).strict()

const refreshSchema = z.object({
  session: sessionSchema,
}).strict()

// [MP-TC-4] Validate session payloads from auth endpoints.
export const parseCourierSession = (payload: unknown): CourierSession => {
  const result = sessionSchema.safeParse(payload)
  if (!result.success) {
    throw new Error('COURIER_SESSION_INVALID')
  }
  return result.data
}

// [MP-TC-4] Validate refresh payloads from auth endpoints.
export const parseCourierSessionRefreshResponse = (
  payload: unknown,
): CourierSessionRefreshResponse => {
  const result = refreshSchema.safeParse(payload)
  if (!result.success) {
    throw new Error('COURIER_SESSION_REFRESH_INVALID')
  }
  return result.data
}
