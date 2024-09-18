import React from 'react'

import TransitionLink from '~/components/transition-link/page'

import s from '../page.module.css'

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.blog__title}>
        <p>
          <TransitionLink href="/">
            <span>I 🩶 my computer job</span>
          </TransitionLink>
        </p>
      </div>
    </footer>
  )
}

export default Footer
