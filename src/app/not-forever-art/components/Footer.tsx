import React from 'react'

import s from '../page.module.css'
import Title from './Title'

const Footer = () => {
  return (
    <footer className={s.footer}>
      <Title useAnimation={false} />
    </footer>
  )
}

export default Footer
