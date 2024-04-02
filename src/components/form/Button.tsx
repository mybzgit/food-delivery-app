import { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'line'
}

const Button = ({
  variant = 'primary',
  children,
  className,
  type = 'button',
  ...props
}: Props) => {
  const btnClass = variant == 'primary' ? 'btn ' : 'btn-line '
  return (
    <button type={type} className={btnClass + className} {...props}>
      {children}
    </button>
  )
}

export default Button
