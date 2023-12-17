import jwt_decode from 'jwt-decode'

import { isDecodedUser } from '../types/type-guards'

export function getDecodedTokenFromStorage() {
  const token = localStorage.getItem('token')
  console.log('🚀 ~ file: token.ts:8 ~ getDecodedTokenFromStorage ~ token:', token)
  if (!token) return null

  try {
    const decodedUser = jwt_decode(token)
    console.log('🚀 ~ file: token.ts:12 ~ getDecodedTokenFromStorage ~ decodedUser:', decodedUser)
    if (!isDecodedUser(decodedUser)) return null

    return decodedUser
  } catch (error) {
    return null
  }
}

export function getTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  return token
}
