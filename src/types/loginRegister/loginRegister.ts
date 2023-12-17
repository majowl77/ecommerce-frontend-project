import { Role } from '../users/usersType'

export type SignUpFormValues = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role
}

export type LogInFormValues = {
  email: string
  password: string
}
export type LoginRegisterInitialState = {
  loginPage: boolean
  signUpPage: boolean
}
