import { useErrorBoundary } from 'react-error-boundary'
interface ErrorFallbackProps {
  error: Error
}
const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const { resetBoundary } = useErrorBoundary()
  return (
    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
      <div>
        <strong className='capitalize font-bold block text-2xl'>Error!</strong>
        <span>{error.message}</span>
      </div>
      <button
        onClick={resetBoundary}
        className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2 hover:cursor-pointer capitalize'
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorFallback
