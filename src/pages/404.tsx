import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()
  return <div className='p-10 text-xl'>{t('page-not-found')}</div>
}

export default NotFound
