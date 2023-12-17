export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
}

export type Role = keyof typeof ROLES

export type User = {
  firstName: string
  lastName: string
  email: string
  role: Role
}

export type UsersinitialState = {
  users: User[]
  isLogedIn: boolean
  isLogedOut: boolean
  error: null | string
  isLoading: boolean
  loggedUser: null | User
  userRole: null | Role
  isEditForm: boolean
  popUp: boolean
}

export type tokenUser = {
  username: string
  id: number
  role: string
}
