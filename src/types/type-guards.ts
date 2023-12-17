import DecodedUser from '../redux/slices/admin/adminSlice'

export function isDecodedUser(obj: unknown): obj is DecodedUser {
  return (
    typeof obj === 'object' && obj !== null && 'email' in obj && 'role' in obj && 'userID' in obj
  )
}
