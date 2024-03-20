import { useEffect } from 'react'
import { useAppStore } from '../../store/app-state'
import { useTranslation } from 'react-i18next'

const LangSwitch = () => {
  const locale = useAppStore((state) => state.locale)
  const switchLocale = useAppStore((state) => state.switchLocale)

  const { i18n } = useTranslation()

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
