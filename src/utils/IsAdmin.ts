import { ROLES } from '../types/users/usersType'
import { getDecodedTokenFromStorage } from './token'

export function isAdmin() {
  const decodedUser = getDecodedTokenFromStorage()

  return decodedUser?.role === ROLES.ADMIN
}
