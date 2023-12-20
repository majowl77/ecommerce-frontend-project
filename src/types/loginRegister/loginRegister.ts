import { z } from 'zod'
import { loginSchema, registerSchema } from '../../utils/constants'
import { Role } from '../users/usersType'

export type LoginRegisterInitialState = {
  loginPage: boolean
  signUpPage: boolean
}

export type RegisterSchema = z.infer<typeof registerSchema>

export type LoginSchema = z.infer<typeof loginSchema>
