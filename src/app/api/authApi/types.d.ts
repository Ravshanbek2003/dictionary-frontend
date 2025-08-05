/* eslint-disable @typescript-eslint/no-empty-object-type */
import {Role, Status} from '@/constants'

export interface LoginRequest {
  phone: string
  password: string
}
export interface LoginResponse {
  token: string
}

export interface MeResponse {
  _id: string
  fullName: string
  phone: string
  password: string
  createdAt: string
  updatedAt: string
}
export interface MeRequest {}
