import LoadingIcon from '../icons/LoadingIcon'

const Loader = () => {
  return (
    <div className='flex w-full justify-center'>
      <LoadingIcon className='h-10 w-10 animate-spin fill-violet-600 text-gray-200' />
    </div>
  )
}

export default Loader
