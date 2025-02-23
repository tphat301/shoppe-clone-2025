import { createContext, useState } from 'react'
import { getAccessTokenFromLS, getProfileFromLS } from '../utils/auth'
import { User } from '../types/user.type'
import { ExtendedPurchase } from '../types/purchase.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  reset: () => void
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchase)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }
  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, reset, extendedPurchase, setExtendedPurchase }}
    >
      {children}
    </AppContext.Provider>
  )
}
