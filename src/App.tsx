import { ToastContainer } from 'react-toastify'
import useElementsRoute from './hooks/useElementsRoute'
import { useContext, useEffect } from 'react'
import { AppContext } from './contexts/app.context'
import { eventTargetLS } from './utils/auth'
function App() {
  const elementsRoute = useElementsRoute()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    eventTargetLS.addEventListener('clearLS', reset)
    return () => {
      eventTargetLS.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <div>
      {elementsRoute}
      <ToastContainer />
    </div>
  )
}

export default App
