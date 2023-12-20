import { Role } from '../users/usersType'

export type SignUpFormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type LogInFormValues = {
  email: string
  password: string
}
export type LoginRegisterInitialState = {
  loginPage: boolean
  signUpPage: boolean
}
