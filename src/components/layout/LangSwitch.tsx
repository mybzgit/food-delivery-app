import { useEffect } from 'react'
import i18n from '../../i18n'
import { useAppStore } from '../../store/app-state'

const LangSwitch = () => {
  const locale = useAppStore((state) => state.locale)
  const switchLocale = useAppStore((state) => state.switchLocale)

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <div
      className='cursor-pointer text-violet-700 hover:text-violet-500 uppercase'
      onClick={switchLocale}
    >
      {locale}
    </div>
  )
}

export default LangSwitch
