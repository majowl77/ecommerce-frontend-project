import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First name must be at least 8 characters')
    .max(30, 'First name must be less than or equal to 30 characters')
    .regex(/^[a-zA-Z\s]*$/, 'First name must consist of letters and spaces only.'),
  lastName: z
    .string()
    .min(3, 'Last name must be at least 8 characters')
    .max(30, 'First name must be less than or equal to 30 characters')
    .regex(/^[a-zA-Z\s]*$/, 'First name must consist of letters and spaces only.'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #fffff',
  boxShadow: 24,
  p: 4
}

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export const forgotPassEmailSchema = z.object({
  email: z.string().email()
})

export const resetPasswordlSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data)=> data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ["confirmPassword"]
})
