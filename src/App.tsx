import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from './firebase'
import './index.css'
import Router from './router'
import { useAppStore } from './store/app-state'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const updateUser = useAppStore((state) => state.updateUser)
  const removeUser = useAppStore((state) => state.removeUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          updateUser(token, user.uid)
        })
      } else {
        removeUser()
      }
    })
    return unsubscribe
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}

export default App
