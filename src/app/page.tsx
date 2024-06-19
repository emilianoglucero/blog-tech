'use client'

import { Loader } from '~/components/loader'
import { useAppStore } from '~/context/use-app-store'

import { Welcome } from './sections/welcome'

const HomePage: React.FC = () => {
  const { introSeen } = useAppStore()
  return introSeen ? <Welcome /> : <Loader />
}

export default HomePage
