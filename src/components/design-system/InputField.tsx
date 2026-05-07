import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import './input-field.css'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
  helperText?: string
}

export function InputField({
  label,
  error,
  helperText,
  id,
  ...props
}: InputFieldProps) {
  return (
    <div className="input-field-wrapper">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        id={id}
        className={`input-field ${error ? 'input-field--error' : ''}`}
        {...props}
      />
      {error && <span className="input-error">{error.message}</span>}
      {helperText && !error && (
        <span className="input-helper">{helperText}</span>
      )}
    </div>
  )
}
