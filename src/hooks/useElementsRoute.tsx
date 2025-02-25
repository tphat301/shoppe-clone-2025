import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext } from 'react'
import ProductList from '../pages/ProductList'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RegisterLayout from '../layouts/RegisterLayout'
import MainLayout from '../layouts/MainLayout'
import { path } from '../constants/path'
import { AppContext } from '../contexts/app.context'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import UserLayout from '../pages/User/layouts/UserLayout'
import Profile from '../pages/User/pages/Profile'
import HistoryPurchase from '../pages/User/pages/HistoryPurchase'
import ChangePassword from '../pages/User/pages/ChangePassword'

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}
// eslint-disable-next-line react-refresh/only-export-components
const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

const useElementsRoute = () => {
  return useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: '',
          index: true,
          element: <ProductList />
        }
      ]
    },
    {
      path: path.productDetail,
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <ProductDetail />
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.user,
          element: <MainLayout />,
          children: [
            {
              path: '',
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: <Profile />
                },
                {
                  path: path.historyPurchase,
                  element: <HistoryPurchase />
                },
                {
                  path: path.changePassword,
                  element: <ChangePassword />
                }
              ]
            }
          ]
        },
        {
          path: path.cart,
          element: <MainLayout />,
          children: [
            {
              path: '',
              element: <Cart />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
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
    }
  ])
}

export default useElementsRoute
