import { signOut } from 'firebase/auth'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import { useAppStore } from '../../store/app-state'
import HeaderCart from './HeaderCart'
import LangSwitch from './LangSwitch'

const Header = () => {
  const token = useAppStore((state) => state.token)

  const handleSignOut = () => {
    signOut(auth)
  }

  const { t } = useTranslation()

  return (
    <header>
      <div className='flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-8'>
        <Link to='/' className='text-left md:text-center'>
          {t('title')}
        </Link>
        {token !== null && <Link to='/menu'>{t('menu')}</Link>}
      </div>

      <div className='flex flex-col-reverse items-end gap-1 md:flex-row md:items-center md:gap-4'>
        {token !== null && (
          <button
            className='btn-line'
            type='button'
            onClick={handleSignOut}
          >
            {t('logout')}
          </button>
        )}
        <div className='flex flex-row items-center gap-2'>
          <LangSwitch />
          <HeaderCart />
        </div>
      </div>
    </header>
  )
}

export default Header
