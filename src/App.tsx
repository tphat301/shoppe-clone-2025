import { ToastContainer } from 'react-toastify'
import useElementsRoute from './hooks/useElementsRoute'
function App() {
  const elementsRoute = useElementsRoute()
  return (
    <div>
      {elementsRoute}
      <ToastContainer />
    </div>
  )
}

export default App
