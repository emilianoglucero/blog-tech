'use client'

import { useAppStore } from '~/context/use-app-store'

import IntroAnimation from './IntroAnimation'

const IntroLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { introSeen } = useAppStore()

  if (introSeen) {
    return <>{children}</>
  }

  return (
    <>
      <IntroAnimation />
      <div className="loader__overlay">{children}</div>
    </>
  )
}

export default IntroLoader
