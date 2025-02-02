import { useRoutes } from 'react-router-dom'
import Product from '../pages/Product'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RegisterLayout from '../layouts/RegisterLayout'
import MainLayout from '../layouts/MainLayout'
import { path } from '../constants/path'

const useElementsRoute = () => {
  const routesMatch = [
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: '',
          index: true,
          element: <Product />
        }
      ]
    },
    {
      path: '',
      element: <RegisterLayout />,
      children: [
        {
          path: path.login,
          element: <Login />
        },
        {
          path: path.register,
          element: <Register />
        }
      ]
    }
  ]
  return useRoutes(routesMatch)
}

export default useElementsRoute
