export type UsersinitialState = {
  users: User[]
  isLogedIn: boolean
  isLogedOut: boolean
  error: null | string
  isLoading: boolean
  loggedUser: null | User
  userRole: null | 'visitor' | 'admin'
  isEditForm: boolean
  popUp: boolean
}

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: 'visitor' | 'admin'
}

export type tokenUser = {
  username: string
  id: number
  role: string
}
