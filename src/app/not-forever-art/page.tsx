// page.tsx
'use client'

import React from 'react'

import { ReactLenis } from '../../lib/lenis'
import Footer from './components/Footer'
import Header from './components/Header'
import MainArticle from './components/MainArticle'
import s from './page.module.css'

const Page = () => {
  return (
    <ReactLenis root>
      <div className={s.container}>
        <Header />
        <MainArticle />
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default Page
