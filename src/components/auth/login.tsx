import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { InputField, Toast } from '../design-system'
import { loginSchema, type LoginFormData } from './schemas'
import { useAuth } from '../../contexts/AuthContext'
import './login.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'error' | 'success'>('error')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const success = await login(data.email, data.password)
      
      if (success) {
        setToastMessage('Login successfully!')
        setToastType('success')
        setTimeout(() => {
          navigate('/dashboard')
        }, 1500)
      } else {
        setToastMessage('Username/password is incorrect')
        setToastType('error')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setToastMessage('An error occurred during login')
      setToastType('error')
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
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  )
}
