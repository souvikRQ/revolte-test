import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField } from '../design-system'
import { loginSchema, type LoginFormData } from './schemas'
import './login.css'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login attempt:', data)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Login successful')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            id="email"
            label="Email or Username"
            type="text"
            placeholder="Enter your email or username"
            error={errors.email}
            {...register('email')}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password}
            {...register('password')}
          />

          <button
            type="submit"
            className="login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
