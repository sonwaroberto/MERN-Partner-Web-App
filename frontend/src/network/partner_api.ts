import { User } from '../models/user'
import { Partner } from './../models/partner'
import { PartnerInput } from './../models/partner'
import { ConflictError, UnauthorizedError } from '../errors/http_error'

async function fecthData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init)
  if (response.ok) {
    return response
  } else {
    const errorBody = await response.json()
    const errorMessage = errorBody.error
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage)
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage)
    } else {
      throw Error(
        'Request failed with status : ' +
          response.status +
          'message: ' +
          errorMessage
      )
    }
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fecthData('/api/users', { method: 'GET' })
  return response.json()
}

export interface SignUpCredentials {
  username: string
  email: string
  password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fecthData('/api/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  return response.json()
}

export interface LoginCredentials {
  username: string
  password: string
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fecthData('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  return response.json()
}

export async function logout() {
  await fecthData('/api/users/logout', { method: 'POST' })
}

export async function fetchPartners(): Promise<Partner[]> {
  const response = await fecthData('/api/partners', { method: 'GET' })
  return response.json()
}

export async function createPartner(partner: PartnerInput): Promise<Partner> {
  console.log(partner)
  const response = await fecthData('/api/partners', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partner),
  })
  return response.json()
}

export async function updatePartner(
  partnerId: string,
  partner: PartnerInput
): Promise<Partner> {
  const response = await fecthData('/api/partners/' + partnerId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(partner),
  })
  return response.json()
}

export async function deletePartner(partnerId: string) {
  await fecthData(`/api/partners/${partnerId}`, { method: 'DELETE' })
}
