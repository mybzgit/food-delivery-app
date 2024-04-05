import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import Button from '../form/Button'
import ValidationErrors from '../layout/ValidationErrors'

type ValuesType = {
  email: string
  password: string
}

const validate = (values: ValuesType) => {
  const errors = {} as ValuesType
  const { email, password } = values
  if (email.trim() == '')
    errors.email = 'Please enter email'
  else if (
    email.trim().match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null
  )
    errors.email = 'Email is invalid'
  if (password.trim() == '') errors.password = 'Please enter password'
  return errors
}

const LoginForm = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values: ValuesType) => {
      const { email, password } = values
      setErrors([])
      signInWithEmailAndPassword(auth, email, password)
        .then(() => navigate('/'))
        .catch((error) => {
          setErrors([error.message])
        })
    },
  })

  const handleRegister = (email: string, password: string) => {
    setErrors([])
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/'))
      .catch((error) => {
        setErrors([error.message])
      })
  }

  const { t } = useTranslation()

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='m-auto flex w-full flex-col gap-4 md:w-1/3'
    >
      <div>
        <label className='label' htmlFor='email'>
          Email:
        </label>
        <input
          id='email'
          type='email'
          name='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>
      <div>
        <label className='label' htmlFor='password'>
          {t('password')}
        </label>
        <input
          id='password'
          type='password'
          name='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>

      {formik.errors.email ? (
        <ValidationErrors errors={[formik.errors.email]} />
      ) : null}
      {formik.errors.password ? (
        <ValidationErrors errors={[formik.errors.password]} />
      ) : null}
      {errors.length > 0 && <ValidationErrors errors={errors} />}

      <div className='flex flex-col'>
        <Button type='submit'>{t('login')}</Button>
        {t('or')}
        <Button
          variant='line'
          onClick={() =>
            handleRegister(
              formik.values.email,
              formik.values.password,
            )
          }
        >
          {t('register')}
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
