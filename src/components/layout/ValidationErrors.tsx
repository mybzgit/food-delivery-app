type Props = {
  errors: string[]
}

const ValidationErrors = ({ errors }: Props) => {
  return (
    <ul>
      {errors.map((err) => (
        <li
          className='ml-5 list-disc text-left text-red-500'
          key={err}
        >
          {err}
        </li>
      ))}
    </ul>
  )
}

export default ValidationErrors
