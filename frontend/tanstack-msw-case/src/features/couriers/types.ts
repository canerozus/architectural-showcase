// Layer: Domain. Responsibility: Courier domain types and invariants. Business logic: YES.
export type CourierId = string
export type OrderId = string

export type CourierStatus = 'active' | 'inactive' | 'suspended'
export type CourierActorRole = 'admin' | 'dispatcher'
export type CourierAccessToken = string

export interface CourierAccessContext {
  actorId: string
  role: CourierActorRole
}

export interface CourierSession {
  token: CourierAccessToken
  expiresAt: string
}

export interface CourierSessionRefreshResponse {
  session: CourierSession
}

export interface Courier {
  id: CourierId
  name: string
  status: CourierStatus
  assignedOrderId: OrderId | null
  createdAt: string
  updatedAt: string
}

export interface CourierListParams {
  page: number
  pageSize: number
  search?: string
  status?: CourierStatus | 'all'
}

export interface CourierListResponse {
  items: Courier[]
  page: number
  pageSize: number
  total: number
}

export interface CourierDetailResponse {
  item: Courier
}

export interface CourierCreateInput {
  name: string
}

export interface CourierAssignInput {
  courierId: CourierId
  orderId: OrderId
}

export interface CourierUnassignInput {
  courierId: CourierId
}

export interface CourierAssignResponse {
  item: Courier
}

export interface CourierDeleteResponse {
  id: CourierId
}

export type CourierErrorCode =
  | 'COURIER_VALIDATION_ERROR'
  | 'COURIER_NOT_FOUND'
  | 'COURIER_CONFLICT'
  | 'COURIER_ASSIGNMENT_CONSTRAINT'
  | 'COURIER_FORBIDDEN'
  | 'COURIER_SESSION_EXPIRED'
  | 'COURIER_IO_ERROR'
  | 'COURIER_NETWORK_ERROR'
  | 'COURIER_UNKNOWN'

export interface CourierDomainError {
  code: CourierErrorCode
  message: string
  status: number
}
