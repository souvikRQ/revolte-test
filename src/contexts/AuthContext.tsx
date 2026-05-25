import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('authToken')
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    // Validate credentials
    if (email === 'admin@mail.com' && password === 'Admin@123') {
      const userData: User = {
        id: 'user-001',
        email: email,
        name: 'Admin User',
      }
      
      // Store user data and token
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now())
      setUser(userData)
      return true
    }
    
    return false
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}