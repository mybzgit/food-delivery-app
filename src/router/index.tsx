import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import MainPage from '../pages/MainPage'
import MenuPage from '../pages/MenuPage'
import CartPage from '../pages/CartPage'
import NotFound from '../pages/404'
import ProtectedRoute from './ProtectedRoute'
import SuccessOrder from '../pages/SuccessOrder'

const Router = () => {
  return (
    <BrowserRouter basename='/apptrix-app/'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path='/menu'
            element={
              <ProtectedRoute>
                <MenuPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/cart'
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path='/success-order'>
            <Route
              path=':id'
              element={
                <ProtectedRoute>
                  <SuccessOrder />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
