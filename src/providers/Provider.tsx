import { UserProvider } from '@/context/UserContext'
import React, { ReactNode } from 'react'

const Provider = ({children}: {children: ReactNode}) => {
  return (
    <UserProvider>{children}</UserProvider>
  )
}

export default Provider