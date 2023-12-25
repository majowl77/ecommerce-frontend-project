import { z } from 'zod'
import { forgotPassEmailSchema, loginSchema, registerSchema, resetPasswordlSchema } from '../../utils/constants'

export type LoginRegisterInitialState = {
  loginPage: boolean
  signUpPage: boolean
}

export type RegisterSchema = z.infer<typeof registerSchema>

export type LoginSchema = z.infer<typeof loginSchema>
export type ForgotPassEmailSchema = z.infer<typeof forgotPassEmailSchema>
export type ResetPasswordlSchema = z.infer<typeof resetPasswordlSchema>
