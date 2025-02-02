import useElementsRoute from './hooks/useElementsRoute'

function App() {
  const elementsRoute = useElementsRoute()
  return <div>{elementsRoute}</div>
}

export default App
