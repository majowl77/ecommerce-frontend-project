import DecodedUser from '../redux/slices/admin/adminSlice'

export function isDecodedUser(obj: unknown): obj is DecodedUser {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'username' in obj &&
    'role' in obj &&
    'user_id' in obj
  )
}
