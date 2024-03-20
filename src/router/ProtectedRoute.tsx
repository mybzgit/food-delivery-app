import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppStore } from '../store/app-state'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppStore((state) => state.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to='/' replace state={{ from: location }} />
  }

  return <>{children}</>
}

export default ProtectedRoute
