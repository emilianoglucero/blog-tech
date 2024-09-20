import { useGSAP } from '@gsap/react'
import { Noto_Color_Emoji } from 'next/font/google'
import { useRef } from 'react'

import TransitionLink from '~/components/transition-link/page'
import { gsap } from '~/lib/gsap'

import s from '../page.module.css'

const notoColorEmoji = Noto_Color_Emoji({
  weight: '400',
  subsets: ['emoji']
})

interface TitleProps {
  useAnimation?: boolean
}

const Title: React.FC<TitleProps> = ({ useAnimation = true }) => {
  const blogTitle = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (useAnimation && blogTitle.current) {
      gsap.from(blogTitle.current, {
        yPercent: 130,
        delay: 0.2,
        stagger: 0.1
      })
    }
  }, [useAnimation])

  return (
    <div className={s.blog__title}>
      <p>
        <TransitionLink href="/">
          <span ref={useAnimation ? blogTitle : null}>
            I <span className={`${notoColorEmoji.className}`}>🩶</span> my
            computer job
          </span>
        </TransitionLink>
      </p>
    </div>
  )
}

export default Title
