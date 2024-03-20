import LoginForm from '../components/main/LoginForm'
import OrderList from '../components/order/OrderList'
import { useAppStore } from '../store/app-state'

const MainPage = () => {
  const token = useAppStore((state) => state.token)

  return (
    <div className='mt-2'>
      {token == null ? <LoginForm /> : <OrderList />}
    </div>
  )
}

export default MainPage
