import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useCallback, useRef, useState } from 'react'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import ValidationErrors from '../layout/ValidationErrors'
import { useTranslation } from 'react-i18next'

const validate = (email: string, password: string) => {
  const errorArr = []
  if (email.trim() == '') errorArr.push('Please enter email')
  else if (
    email.trim().match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null
  )
    errorArr.push('Email is invalid')
  if (password.trim() == '') errorArr.push('Please enter password')
  return errorArr
}

const LoginForm = () => {
  const navigate = useNavigate()

  const [errors, setErrors] = useState<string[]>([])

  const onLogin = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()

      const email = emailRef.current?.value as string
      const password = passwordRef.current?.value as string
      const validationResult = validate(email, password)
      if (validationResult.length > 0) {
        setErrors(validationResult)
        return
      } else {
        setErrors([])
        signInWithEmailAndPassword(auth, email, password)
          .then(() => navigate('/'))
          .catch((error) => {
            setErrors([error.message])
          })
      }
    },
    [navigate],
  )

  const onRegister = useCallback(() => {
    const email = emailRef.current?.value as string
    const password = passwordRef.current?.value as string
    const validationResult = validate(email, password)
    if (validationResult.length > 0) {
      setErrors(validationResult)
      return
    } else {
      setErrors([])
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => navigate('/'))
        .catch((error) => {
          setErrors([error.message])
        })
    }
  }, [navigate])

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const { t } = useTranslation()

  return (
    <form className='m-auto flex w-full flex-col gap-4 md:w-1/3'>
      <div>
        <label className='label' htmlFor='id'>
          Email:
        </label>
        <input id='email' type='text' name='email' ref={emailRef} />
      </div>
      <div>
        <label className='label' htmlFor='password'>
          {t('password')}
        </label>
        <input
          id='password'
          type='password'
          name='password'
          ref={passwordRef}
        />
      </div>

      {errors.length > 0 && <ValidationErrors errors={errors} />}

      <div className='flex flex-col'>
        <button className='btn' type='submit' onClick={onLogin}>
          {t('login')}
        </button>
        {t('or')}
        <button
          className='btn-line'
          type='button'
          onClick={onRegister}
        >
          {t('register')}
        </button>
      </div>
    </form>
  )
}

export default LoginForm
